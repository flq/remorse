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

export function morseCodeToChar(char) {
  if (!char)
    return "";
  return codesToLetters[char.toLowerCase()] || "?";
}


export function calculateMorscore(successRate, scope, amount, timeTaken) {
  return (successRate * scope * (1.3 * amount / timeTaken)).toFixed(2);
}
