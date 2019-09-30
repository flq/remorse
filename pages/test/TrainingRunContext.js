import React, { useReducer, useMemo } from "react";
import { LETTERS } from "../../lib/morse";

export const TrainingRunContext = React.createContext(null);

const trainingRunReducer = (state, action) => {
  const { scope } = state;
  switch (action.type) {
    case "SCOPE_TOGGLE":
      if (scope.has(action.letter)) {
        scope.delete(action.letter);
      } else {
        scope.add(action.letter);
      }
      return { ...state, scope };
    case "SCOPE_ALL":
      return { ...state, scope: new Set(LETTERS) };
    case "SCOPE_NONE":
      return { ...state, scope: new Set() };
  }
  return state;
};

export default ({ children }) => {
  const [state, dispatch] = useReducer(trainingRunReducer, {
    scope: new Set()
  });
  const actions = useMemo(
    () => ({
      toggleScope(letter) {
        dispatch({ type: "SCOPE_TOGGLE", letter });
      },
      putAllInScope() {
        dispatch({ type: "SCOPE_ALL" });
      },
      clearScope() {
        dispatch({ type: "SCOPE_NONE" });
      }
    }),
    []
  );
  return (
    <TrainingRunContext.Provider value={{ state, actions }}>
      {children}
    </TrainingRunContext.Provider>
  );
};
