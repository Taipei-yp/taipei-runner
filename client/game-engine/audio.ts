// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable no-param-reassign */
import soundSrcBg from "./assets/sounds/bgaudio.ogg";
import soundSrcGameover from "./assets/sounds/gameover.wav";
import soundSrcJump from "./assets/sounds/jump.wav";
import { gameConfig as config } from "./config";

export enum SoundAction {
  JUMP,
  GAMEOVER,
  BG,
}

type SoundRaw = {
  src: string;
  duration?: number;
  volume?: number;
};

type SoundElement = {
  buffer: AudioBuffer;
  duration: number;
  volume: number;
  nodes?: {
    gainNode: GainNode;
    source: AudioBufferSourceNode;
  };
};

const soundActions: Record<SoundAction, SoundRaw> = {
  [SoundAction.JUMP]: {
    src: soundSrcJump,
  },
  [SoundAction.GAMEOVER]: {
    src: soundSrcGameover,
    duration: 0.4,
  },
  [SoundAction.BG]: {
    src: soundSrcBg,
    duration: 0,
  },
};

export default class GameAudio {
  audioContext: AudioContext;
  audioBuffers: Record<string, AudioBuffer>;
  soundElements: Record<string, SoundElement>;
  bgSoundElement?: SoundElement;
  soundsLoaded: boolean;
  canPlay: boolean;
  bgSoundPlay: boolean;

  constructor() {
    this.audioContext = new AudioContext();
    this.audioBuffers = {};
    this.soundElements = {};
    this.soundsLoaded = false;
    this.canPlay = false;
    this.bgSoundPlay = false;
  }

  init() {
    this.loadAllSounds();
    this.audioContext.addEventListener("statechange", () => {
      this.canPlay = true;
      this.playBgSound();
    });
  }

  canPlaySound() {
    this.audioContext.resume();
  }

  private loadAllSounds() {
    Promise.allSettled(
      Object.keys(soundActions)
        .map(Number)
        .map(key =>
          this.loadAudio(
            soundActions[key as SoundAction].src,
            key as SoundAction,
          ),
        ),
    ).then(results => {
      results.forEach(result => {
        if (result.status === "fulfilled") {
          const { action, audioBuffer } = result.value;
          this.createSound(action, audioBuffer);
        } else {
          window.console.error(`load sound error - ${result.reason}`);
        }
      });
      this.loaded();
    });
  }

  private async loadAudio(url: string, action: SoundAction) {
    const buffer = await fetch(url).then(response => response.arrayBuffer());
    return this.audioContext.decodeAudioData(buffer).then(audioBuffer => {
      return { action, audioBuffer };
    });
  }

  private createSound(action: SoundAction, buffer: AudioBuffer) {
    let duration = soundActions[action]?.duration;
    if (duration === undefined) duration = buffer.duration;
    let volume = soundActions[action]?.volume;
    if (volume === undefined) volume = 1;
    const sound: SoundElement = {
      buffer,
      duration,
      volume,
    };
    if (duration === 0 && this.bgSoundElement === undefined) {
      sound.volume = config.audio.bgVolume;
      this.bgSoundElement = sound;
    } else {
      this.soundElements[action] = sound;
    }
  }

  loaded() {
    this.soundsLoaded = true;
  }

  private play(sound: SoundElement, loop = false) {
    if (this.soundsLoaded && this.canPlay) {
      const source = this.audioContext.createBufferSource();
      const gainNode = this.audioContext.createGain();
      gainNode.gain.setValueAtTime(sound.volume, this.audioContext.currentTime);
      source.loop = loop;
      source.buffer = sound.buffer;
      sound.nodes = {
        source,
        gainNode,
      };
      source.connect(gainNode);
      gainNode.connect(this.audioContext.destination);
      source.start(this.audioContext.currentTime);
      if (!loop) {
        this.stop(sound);
      }
    }
  }

  private stop(sound: SoundElement) {
    sound.nodes?.gainNode.gain.exponentialRampToValueAtTime(
      0.001,
      this.audioContext.currentTime + sound.duration,
    );
    sound.nodes?.source.stop(this.audioContext.currentTime + sound.duration);
  }

  actionSound(action: SoundAction) {
    const sound = this.soundElements[action];
    if (sound) this.play(sound);
  }

  playBgSound() {
    this.bgSoundPlay = true;
    if (this.bgSoundElement && this.canPlay) {
      this.play(this.bgSoundElement, true);
    }
  }
  stopBgSound() {
    this.bgSoundPlay = false;
    if (this.bgSoundElement) {
      this.stop(this.bgSoundElement);
    }
  }
}
