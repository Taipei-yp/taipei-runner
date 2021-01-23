import { formatScore } from "./format-score";

describe("utils/format-score", () => {
  it("correct format", () => {
    expect(formatScore(10)).toBe("000010");
  });
});
