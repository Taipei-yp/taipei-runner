export const arrayOfNumbersInRange = (from: number, to: number): number[] => {
  const result = [];
  for (let i = from; i <= to; ++i) {
    result.push(i);
  }
  return result;
};
