
const initailState = [];

export function classReducer(state = initailState, action) {
  switch (action.type) {
    case "SELECT_TO_CLASS":
      const selectedClass = [...state, action.payload];
      return selectedClass;
    default:
      return state;
  }
}
