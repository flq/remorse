export default function appReducer(state = {}, action) {
  switch (action.type) {
    case "CHANGE_MORSE_TEXT":
      return { ...state, userInput: action.userInput };
    case "CHANGE_SOUND_SPEED":
      return { ...state, soundSpeed: action.soundSpeed };
    case "CHANGE_TRAIN_COUNT":
      return { ...state, train: { ...state.train, trainCount: action.value } };
    case "START_TRAINING":
      return updateCurrentTraining(state, action, ct => ({
        started: true,
        itemsLeft: state.train.trainCount,
        currentTime: -4
      }));
    case "TRAINING_FRAME":
      return updateCurrentTraining(state, action, (ct, act) => ({
        ...ct,
        currentLetter: act.currentLetter || ct.currentLetter,
        currentTime: ct.currentTime + 1
      }));
    case "TRAINING_UPDATE":
      return updateCurrentTraining(state, action, (ct, act) => ({
        ...ct,
        currentInput: act.currentInput
      }));
    case "TRAINING_STOPPED":
      return updateCurrentTraining(state, action, (ct, act) => ({
        started: false
      }));
    case "TRAINING_PROCEEDS":
      return updateCurrentTraining(state, action, (ct,act) => ({
        ...ct,
        itemsLeft: ct.itemsLeft - 1,
        results: [...(ct.results || []), act.succeeded],
        currentLetter: act.nextLetter,
        currentInput: ""
      }));
    case "TRAINING_ENDED":
      return updateCurrentTraining(state, action, ct => ({
        ...ct,
        itemsLeft: 0,
        currentLetter: "",
        currentInput: "",
        ended: true
      }));
    case "CHANGE_TRAINING_SCOPE":
      return {
        ...state,
        train: {
          ...state.train,
          lettersInScope: action.lettersInScope
        }
      };
    default:
      return state;
  }
}

function updateCurrentTraining(state, action, fNewCurrentTraining) {
  return {
    ...state,
    train: {
      ...state.train,
      currentTraining: fNewCurrentTraining(state.train.currentTraining, action)
    }
  };
}
