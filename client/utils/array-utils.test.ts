import { arrayOfNumbersInRange } from "./array-utils";

describe("utils/array-utils arrayOfNumbersInRange", () => {
  const resultArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  it("return array", () => {
    expect(arrayOfNumbersInRange(1, 10) instanceof Array).toBe(true);
  });
  it("correct array", () => {
    expect(arrayOfNumbersInRange(1, 10)).toEqual(resultArray);
  });
});
