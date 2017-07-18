import {storeObject, APP_STATE_KEY  } from "./components/Utils";

export function saveProgress() {
  return (dispatch, getState) => {
    storeObject(APP_STATE_KEY, getState());
    dispatch({type: "NO_OP"});
  }
}
