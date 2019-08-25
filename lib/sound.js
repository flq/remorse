import { charToMorseCode } from "./morse";
import { delay } from "./utils";

// based on
// http://www.nu-ware.com/NuCode%20Help/index.html?morse_code_structure_and_timing_.htm
// dot -> dot length, dash = 3 * dot, pause between chars = 3 * dot,
// pause between words = 7 * dot
export const DOT_LENGTH = 50;
export const DASH_LENGTH = 150;
export const PAUSE = 400;

let oscillator = null;
let audioCtx = null;

try {
  audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  oscillator = audioCtx.createOscillator();
  oscillator.type = "sine";
  oscillator.frequency.value = 880; // value in hertz
  oscillator.start();
} catch (x) {
  console.warn("Oscillator not available in your env");
  // null implementations for test environment.
  audioCtx = {
    destination: {}
  };
  oscillator = {
    connect: () => {},
    disconnect: () => {}
  };
}

/**
 * Plays the input string as morse sound in terms of a side-effect.
 * The promise fulfills once all characters have been heard
 * @param {string} input - the input text
 * @param {number} soundSpeed - factor to reduce the speed of morsing
 * @param {Function} callback - gets called with the current character index being morsed
 * @returns {Promise<void>}
 */
export async function textAsMorseSound(input, soundSpeed, callback = () => {}) {
  await audioCtx.resume();
  let characterIndex = 0;
  for (let character of Array.from(input)) {
    callback(characterIndex++);
    const code = charToMorseCode(character);
    await asyncPlayMorse(Array.from(code), soundSpeed);
    await delay(DASH_LENGTH / soundSpeed); // Pause between chars
  }
}

/**
 * Expects an array of single-length strings where each string is a dot, dash or space
 * @param {string[]} characters - the dots, dashes and spaces
 * @param {number} soundSpeed
 * @returns {Promise<void>}
 */
export async function asyncPlayMorse(characters, soundSpeed = 1) {
  for (let c of characters) {
    switch (c) {
      case ".":
        startSound();
        await delay(DOT_LENGTH / soundSpeed);
        stopSound();
        await delay(DOT_LENGTH / soundSpeed);
        break;
      case "-":
        startSound();
        await delay(DASH_LENGTH / soundSpeed);
        stopSound();
        await delay(DOT_LENGTH / soundSpeed);
        break;
      case " ":
        await delay(PAUSE / soundSpeed);
        break;
      default:
        console.log(c);
        break;
    }
  }
}

function startSound() {
  oscillator.connect(audioCtx.destination);
}

function stopSound() {
  oscillator.disconnect(audioCtx.destination);
}
