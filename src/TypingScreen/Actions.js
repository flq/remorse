import { textAsMorseSound } from "../components/SoundLib";

export function changeMorsedText(userInput) {
  const fragments = userInput.split(" ");
  if (fragments.length > 5) {
    // In reality, it's four words due to a rogue empty string.
    fragments.shift();
    userInput = fragments.join(" ");
  }
  return {
    type: "CHANGE_MORSE_TEXT",
    userInput
  };
}

export function changeSoundSpeed(soundSpeed) {
  return {
    type: "CHANGE_SOUND_SPEED",
    soundSpeed
  };
}

export function playSound() {
  return async (dispatch, getState) => {
    const { userInput, soundSpeed } = getState();
    textAsMorseSound(userInput, soundSpeed);
  };
}