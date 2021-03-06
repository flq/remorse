import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import { Route } from "react-router";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";

import Navigation from "./components/Navigation";
import { retrieveObject, APP_STATE_KEY } from "./components/Utils";
import appReducer from "./AppReducer";
import TypingScreen from "./TypingScreen/TypingScreen";
import WritingScreen from "./Training/Writing/WritingScreen";
import ReadingScreen from "./Training/Reading/ReadingScreen";
import TrainingDataScreen from "./TrainingData/TrainingDataScreen";

const initialState = retrieveObject(APP_STATE_KEY) || {
  typing: {
    userInput: "",
    soundSpeed: 0.8
  },
  train: {
    lettersInScope: [],
    trainCount: 20
    /*currentTraining: {
          currentTime,
          itemsLeft,
          ...
      }*/
  }
};

const store = createStore(appReducer, initialState, applyMiddleware(thunk));

class App extends Component {
  render() {
    return (
      <BrowserRouter basename={process.env.REACT_APP_BASENAME}>
        <Provider store={store}>
          <div id="root">
            <Navigation />
            <Route path="/typing" component={TypingScreen} />
            <Route path="/test-writing-morse" component={WritingScreen} />
            <Route path="/test-reading-morse" component={ReadingScreen} />
            <Route path="/training-data" component={TrainingDataScreen} />
          </div>
        </Provider>
      </BrowserRouter>
    );
  }
}

export default App;
