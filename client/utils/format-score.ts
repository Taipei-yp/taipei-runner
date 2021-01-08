const NUM_LENGTH = 6;

export function formatScore(score: number) {
  return score.toString().padStart(NUM_LENGTH, "0");
}
