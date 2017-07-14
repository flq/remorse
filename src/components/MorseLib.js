export const LETTERS = [
  ".", ",", "?",
  "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l",
  "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x",
  "y", "z",
  "1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

const codes = [
  ".-.-.-", "--..--", "..--..",
  ".-", "-...", "-.-.", "-..", ".", "..-.", "--.", "....", "..", ".---", "-.-", ".-..",
  "--", "-.", "---", ".--.", "--.-", ".-.", "...", "-", "..-", "...-", ".--", "-..-",
  "-.--", "--..",
  ".----", "..---", "...--", "....-", ".....", "-....", "--...", "---..", "----.", "-----"];

const lettersToCodes = {};
const codesToLetters = {};

for (let i = 0; i < LETTERS.length; i++) {
  lettersToCodes[LETTERS[i]] = codes[i];
  codesToLetters[codes[i]] = LETTERS[i];
}

// Special case space. We know it, but it's not really a letter
lettersToCodes[" "] = " ";
codesToLetters[" "] = " ";

export function charToMorseCode(char) {
  if (!char)
    return "";
  return lettersToCodes[char.toLowerCase()] || "?";
}
