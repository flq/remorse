import { getRandomInt } from "../../components/Utils";
import createTrainingActions from "../TrainingActions";
import { charToMorseCode } from "../../components/MorseLib";

function inputFromKeyCode(keyCode) {
  return keyCode === 190 ? "." : keyCode === 189 ? "-" : null;
}

function nextLetterProvider(scope) {
  const randomIndex = getRandomInt(0, scope.length);
  return scope[randomIndex];
}

const Actions = createTrainingActions({
  nextLetterProvider,
  inputFromKeyCode,
  expectedInputFromCurrentTrainingSet: charToMorseCode
});
export default Actions;
