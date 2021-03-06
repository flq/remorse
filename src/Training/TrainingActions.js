import { LETTERS } from "../components/MorseLib";
import { retrieveObject, storeObject } from "../components/Utils";

export default function createTrainingActions({
  trainDataStorageKey,
  nextLetterProvider,
  inputFromKey,
  expectedInputFromCurrentTrainingSet
}) {
  let timer = null;
  function _trainingFrame(dispatch, trainingState) {
    if (trainingState.currentTraining.currentTime === -1) {
      // this frame the training starts
      dispatch({
        type: "TRAINING_FRAME",
        currentLetter: nextLetterProvider(trainingState.lettersInScope)
      });
    } else {
      dispatch({ type: "TRAINING_FRAME" });
    }
  }

  return {
    startTraining() {
      return (dispatch, getState) => {
        clearInterval(timer);
        dispatch({ type: "START_TRAINING" });
        timer = setInterval(() => _trainingFrame(dispatch, getState().train), 1000);
      };
    },

    forceStopTraining() {
      clearInterval(timer);
      return {
        type: "TRAINING_STOPPED"
      };
    },

    changeWritingScope(letter) {
      return (dispatch, getState) => {
        const { lettersInScope } = getState().train;
        const idx = lettersInScope.indexOf(letter);
        const newScope =
          idx === -1
            ? [...lettersInScope, letter]
            : [...lettersInScope.slice(0, idx), ...lettersInScope.slice(idx + 1)];
        dispatch({
          type: "CHANGE_TRAINING_SCOPE",
          lettersInScope: newScope
        });
      };
    },

    putAllInScope() {
      return dispatch => {
        dispatch({
          type: "CHANGE_TRAINING_SCOPE",
          lettersInScope: [...LETTERS]
        });
      };
    },

    removeAllFromScope() {
      return dispatch => {
        dispatch({
          type: "CHANGE_TRAINING_SCOPE",
          lettersInScope: []
        });
      };
    },

    changeTrainCount(value) {
      return {
        type: "CHANGE_TRAIN_COUNT",
        value
      };
    },

    evaluateUserInput(key) {
      const input = inputFromKey(key);
      if (!input) return { type: "NO_OP" };

      return (dispatch, getState) => {
        let { currentTraining, lettersInScope } = getState().train;
        let userInput = (currentTraining.userInput || "") + input;
        const expectedInput = expectedInputFromCurrentTrainingSet(currentTraining.currentLetter);

        if (userInput.length === expectedInput.length) {
          dispatch({
            type: "TRAINING_PROCEEDS",
            succeeded: userInput === expectedInput,
            nextLetter: nextLetterProvider(lettersInScope)
          });
          if (currentTraining.itemsLeft === 1) {
            // This was the last item in the training!
            clearInterval(timer);
            dispatch({
              type: "TRAINING_ENDED",
              successRate: successRate(getState().train.currentTraining.results)
            });
          }
        } else {
          dispatch({
            type: "TRAINING_UPDATE",
            userInput
          });
        }
      };
    },

    saveTraining() {
      return (dispatch, getState) => {
        const trainData = getState().train;
        const dataPoint = {
          time: new Date(),
          successRate: trainData.currentTraining.successRate,
          scopeRatio: (trainData.lettersInScope.length / LETTERS.length).toFixed(2),
          amount: trainData.trainCount,
          timeTaken: trainData.currentTraining.currentTime
        };
        let trainingData = retrieveObject(trainDataStorageKey) || [];
        trainingData.push(dataPoint);
        storeObject(trainDataStorageKey, trainingData);
        dispatch({
          type: "TRAINING_STOPPED"
        });
      };
    }
  };
}

function successRate(results) {
  var successes = results.reduce((sum, r) => (r ? sum + 1 : sum), 0);
  return (successes / results.length).toFixed(2);
}
