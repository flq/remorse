import React, { useReducer, useMemo } from "react";

export const TrainingRunContext = React.createContext(null);

const trainingRunReducer = (state, action) => {
  const { scope } = state;
  switch (action.type) {
    case "ToggleScope":
      if (scope.has(action.letter)) {
        scope.delete(action.letter);
      } else {
        scope.add(action.letter);
      }
      return { ...state, scope };
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
        dispatch({ type: "ToggleScope", letter });
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
