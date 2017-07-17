import { getRandomInt, APP_WRITE_TRAINDATA_KEY } from "../../components/Utils";
import createTrainingActions from "../TrainingActions";
import { charToMorseCode } from "../../components/MorseLib";

function inputFromKey(key) {
  return key === "." || key === "-" ? key : null;
}

function nextLetterProvider(scope) {
  const randomIndex = getRandomInt(0, scope.length);
  return scope[randomIndex];
}

const Actions = createTrainingActions({
  trainDataStorageKey: APP_WRITE_TRAINDATA_KEY,
  nextLetterProvider,
  inputFromKey,
  expectedInputFromCurrentTrainingSet: charToMorseCode
});
export default Actions;
