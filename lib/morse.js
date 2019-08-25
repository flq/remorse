export const LETTERS = [
  ".",
  ",",
  "?",
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "0"
];

const codes = [
  ".-.-.-",
  "--..--",
  "..--..",
  ".-",
  "-...",
  "-.-.",
  "-..",
  ".",
  "..-.",
  "--.",
  "....",
  "..",
  ".---",
  "-.-",
  ".-..",
  "--",
  "-.",
  "---",
  ".--.",
  "--.-",
  ".-.",
  "...",
  "-",
  "..-",
  "...-",
  ".--",
  "-..-",
  "-.--",
  "--..",
  ".----",
  "..---",
  "...--",
  "....-",
  ".....",
  "-....",
  "--...",
  "---..",
  "----.",
  "-----"
];

const lettersToCodes = new Map();
const codesToLetters = new Map();

for (let i = 0; i < LETTERS.length; i++) {
  lettersToCodes.set(LETTERS[i], codes[i]);
  codesToLetters.set(codes[i], LETTERS[i]);
}

// Special case space. We know it, but it's not really a letter
lettersToCodes.set(" ", " ");
codesToLetters.set(" ", " ");

/**
 * Returns the morse codes as string
 * @param {string} char - the char to convert
 * @returns {string} - morse code as a series of dots and dashes
 */
export function charToMorseCode(char) {
  if (!char) return "";
  return lettersToCodes.get(char.toLowerCase()) || "?";
}

export function morseCodeToChar(char) {
  if (!char) return "";
  return codesToLetters.get(char.toLowerCase()) || "?";
}

export function calculateMorscore(successRate, scope, amount, timeTaken) {
  return (successRate * scope * ((1.3 * amount) / timeTaken)).toFixed(2);
}
