import { LETTERS, charToMorseCode} from "../components/MorseLib";

export function changeWritingScope(letter) {
  return (dispatch, getState) => {
    const { lettersInScope } = getState().writing;
    const idx = lettersInScope.indexOf(letter);
    const newScope =
      idx === -1
        ? [...lettersInScope, letter]
        : [...lettersInScope.slice(0, idx), ...lettersInScope.slice(idx + 1)];
    dispatch({
      type: "CHANGE_WRITING_SCOPE",
      lettersInScope: newScope
    });
  };
}

export function putAllInScope() {
  return (dispatch) => {
    dispatch({
      type: "CHANGE_WRITING_SCOPE",
      lettersInScope: [...LETTERS]
    });
  }
}

export function removeAllFromScope() {
  return (dispatch) => {
    dispatch({
      type: "CHANGE_WRITING_SCOPE",
      lettersInScope: []
    });
  }
}

export function changeTrainCount(value) {
  return {
    type: "CHANGE_TRAIN_COUNT",
    value
  };
}

let timer = null;

export function startTraining() {
  return (dispatch, getState) => {
    clearInterval(timer);
    dispatch({type: "START_TRAINING" });
    timer = setInterval(() => trainingFrame(dispatch, getState().writing), 1000);
  } 
}

export function forceStopTraining() {
  clearInterval(timer);
  return {
    type: "TRAINING_STOPPED"
  }
}

export function evaluateUserInput(keyCode) {
  const input = getValidInputFromKeyCode(keyCode);
  if (!input)
    return { type: "NO_OP" };

  return (dispatch,getState) => {

    let {currentTraining, lettersInScope} = getState().writing;
    let currentInput = (currentTraining.currentInput || "") + input;
    const expectedMorse = charToMorseCode(currentTraining.currentLetter);

    if (currentInput.length === expectedMorse.length) {
      dispatch({ 
        type: "TRAINING_PROCEEDS",
        succeeded: currentInput === expectedMorse,
        nextLetter: getNextLetter(lettersInScope)
      });
      if (currentTraining.itemsLeft === 1) {
        // This was the last item in the training!
        clearInterval(timer);
        dispatch({ type: "TRAINING_ENDED" });
      }
    }
    else {
      dispatch({ 
        type: "TRAINING_UPDATE",
        currentInput
      });
    }
  }
}

function trainingFrame(dispatch, trainingState) {
  if (trainingState.currentTraining.currentTime === -1) {
    // this frame the training starts
    dispatch({type: "TRAINING_FRAME", currentLetter: getNextLetter(trainingState.lettersInScope)})
  }
  else{
    dispatch({type: "TRAINING_FRAME"});
  }
};

function getValidInputFromKeyCode(keyCode) {
  return keyCode === 190 ?  "." : keyCode === 189 ? "-" : null
}

function getNextLetter(scope) {
  const randomIndex = getRandomInt(0, scope.length);
  return scope[randomIndex];
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}