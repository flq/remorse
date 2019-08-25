import { getWordsWithStartAndEndIndex } from "../../pages/typing/Morse";

describe("typing/morse", () => {
  it("correctly resolves indexes", () => {
    const text = "Hello dear A";
    const tuples = getWordsWithStartAndEndIndex(text);
    expect(tuples).toEqual([["Hello", 0, 4], ["dear", 6, 9], ["A", 11, 11]]);
    expect(text.substring(tuples[1][1], tuples[1][2] + 1)).toBe("dear");
    expect(text.substring(tuples[2][1], tuples[2][2] + 1)).toBe("A");
  });
});
