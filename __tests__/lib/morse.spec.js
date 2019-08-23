import { charToMorseCode, morseCodeToChar } from "../../lib/morse";

describe("lib/morse", () => {
  for (const { char, code } of [
    { char: "a", code: ".-" },
    { char: "e", code: "." },
    { char: "A", code: ".-" }
  ]) {
    it(`converts ${char} -> ${code} and back`, () => {
      expect(charToMorseCode(char)).toBe(code);
      expect(morseCodeToChar(code)).toBe(char.toLowerCase());
    });
  }
});
