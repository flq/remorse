import { combineReducers } from "redux";
import train from "./Training/TrainingReducer";
import typing from "./TypingScreen/TypingReducer";


const appReducer = combineReducers({ typing, train });
export default appReducer;
