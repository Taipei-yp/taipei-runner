export const arrayFromTo = (min: number, max: number): number[] => {
  const result = [];
  for (let i = min; i <= max; ++i) {
    result.push(i);
  }
  return result;
};
