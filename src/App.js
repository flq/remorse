import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import { Route } from "react-router";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";

import "./App.css";
import Navigation from "./components/Navigation";
import appReducer from "./AppReducer";
import TypingScreen from "./Screens/TypingScreen";
import WritingScreen from "./WritingScreen/WritingScreen";

const initialState = localStorage.remorseApplicationState
  ? JSON.parse(localStorage.remorseApplicationState)
  : {
      userInput: "",
      soundSpeed: 0.8,
      writing : {
        lettersInScope: [],
        trainCount: 20,
        /*currentTraining: {
          currentTime,
          itemsLeft,

        }*/
      }
    };

const store = createStore(appReducer, initialState, applyMiddleware(thunk));

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Provider store={store}>
          <div id="root">
            <Navigation />
            <Route path="/typing" component={TypingScreen} />
            <Route path="/test-writing-morse" component={WritingScreen} />
          </div>
        </Provider>
      </BrowserRouter>
    );
  }
}

export default App;
