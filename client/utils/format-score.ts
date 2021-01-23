const NUM_LENGTH = 6;

export const formatScore = (score: number) => {
  return score.toString().padStart(NUM_LENGTH, "0");
};
