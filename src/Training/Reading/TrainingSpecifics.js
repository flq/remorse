import { getRandomInt, APP_READ_TRAINDATA_KEY } from "../../components/Utils";
import createTrainingActions from "../TrainingActions";
import { charToMorseCode, morseCodeToChar } from "../../components/MorseLib";

function inputFromKey(key) {
  return key;
}

function nextLetterProvider(scope) {
  const randomIndex = getRandomInt(0, scope.length);
  return charToMorseCode(scope[randomIndex]);
}

const Actions = createTrainingActions({
  trainDataStorageKey: APP_READ_TRAINDATA_KEY,
  nextLetterProvider,
  inputFromKey,
  expectedInputFromCurrentTrainingSet: morseCodeToChar
});
export default Actions;
