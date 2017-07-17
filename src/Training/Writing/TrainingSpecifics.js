import { getRandomInt } from "../../components/Utils";
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
  nextLetterProvider,
  inputFromKey,
  expectedInputFromCurrentTrainingSet: charToMorseCode
});
export default Actions;
