export default function train(state = {}, action) {
  switch (action.type) {
    case "CHANGE_TRAIN_COUNT":
      return { ...state, trainCount: action.value };
    case "CHANGE_TRAINING_SCOPE":
      return {
        ...state,
        lettersInScope: action.lettersInScope
      };
    case "START_TRAINING":
      return updateCurrentTraining(state, action, ct => ({
        started: true,
        itemsLeft: state.trainCount,
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
        userInput: act.userInput
      }));
    case "TRAINING_STOPPED":
      return updateCurrentTraining(state, action, (ct, act) => ({
        started: false
      }));
    case "TRAINING_PROCEEDS":
      return updateCurrentTraining(state, action, (ct, act) => ({
        ...ct,
        itemsLeft: ct.itemsLeft - 1,
        results: [...(ct.results || []), act.succeeded],
        currentLetter: act.nextLetter,
        userInput: ""
      }));
    case "TRAINING_ENDED":
      return updateCurrentTraining(state, action, (ct, act) => ({
        ...ct,
        itemsLeft: 0,
        currentLetter: "",
        userInput: "",
        ended: true,
        successRate: act.successRate
      }));
    default:
      return state;
  }
}

function updateCurrentTraining(state, action, fNewCurrentTraining) {
  return {
    ...state,
    currentTraining: fNewCurrentTraining(state.currentTraining, action)
  };
}
