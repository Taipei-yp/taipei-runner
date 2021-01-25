import { formatScore } from "./format-score";

describe("utils/format-score", () => {
  it("returns string with at least 6 characters", () => {
    expect(formatScore(42)).toHaveLength(6);
  });

  it("fills start of the result string with zeroes", () => {
    expect(/^0+11$/.test(formatScore(11))).toBe(true);
  });

  it("doesn't truncate big numbers", () => {
    expect(formatScore(1234567)).toBe("1234567");
    expect(formatScore(123456789)).toBe("123456789");
  });
});
