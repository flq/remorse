export default function typing(state = {}, action) {
  switch (action.type) {
    case "CHANGE_MORSE_TEXT":
      return { ...state, userInput: action.userInput };
    case "CHANGE_SOUND_SPEED":
      return { ...state, soundSpeed: action.soundSpeed };
    default:
      return state;
  }
}