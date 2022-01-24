const stateObj = {
  chosenCity: undefined,
};
export function canadaSelection(state = stateObj, action) {
  switch (action.type) {
    case "CHOOSE_CITY_CANADA":
      return { chosenCity: action.chosenCity };
  }
  return state;
}
