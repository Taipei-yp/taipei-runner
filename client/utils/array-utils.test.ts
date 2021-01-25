import { arrayOfNumbersInRange } from "./array-utils";

describe("utils/array-utils arrayOfNumbersInRange", () => {
  it("returns array", () => {
    expect(arrayOfNumbersInRange(1, 10) instanceof Array).toBe(true);
  });

  it("returns array with one element for [0 0] range", () => {
    expect(arrayOfNumbersInRange(0, 0)).toEqual([0]);
  });

  it("returns empty array for invalid range", () => {
    expect(arrayOfNumbersInRange(3, -5)).toEqual([]);
    expect(arrayOfNumbersInRange(3, 2)).toEqual([]);
  });

  it("includes start element in result array", () => {
    expect(arrayOfNumbersInRange(4, 9)).toContain(4);
  });

  it("includes end element in result array", () => {
    expect(arrayOfNumbersInRange(4, 9)).toContain(9);
  });

  it("returns all numbers in range", () => {
    const resultArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    expect(arrayOfNumbersInRange(1, 10)).toEqual(resultArray);
  });

  it("can handle negative values", () => {
    const resultArray = [-3, -2, -1];
    expect(arrayOfNumbersInRange(-3, -1)).toEqual(resultArray);
  });
});
