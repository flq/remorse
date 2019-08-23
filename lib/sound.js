import { charToMorseCode } from "./MorseLib";
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

export async function textAsMorseSound(input, soundSpeed) {
  await audioCtx.resume();
  for (let c of Array.from(input)) {
    const code = charToMorseCode(c);
    await asyncPlayMorse(Array.from(code), soundSpeed);
    await delay(DASH_LENGTH / soundSpeed); // Pause between chars
  }
}

// characters: Array of strings like "-" and "." and " "
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
