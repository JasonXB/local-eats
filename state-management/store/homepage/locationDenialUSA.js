import { yelpCitiesUS } from "../yelpData";

const stateObj = {
  chosenState: undefined,
  chosenCity: undefined,
  cityList: yelpCitiesUS["Arizona"],
  counter: 0,
  menu2Disabled: true,
};
export function usaSelection(state = stateObj, action) {
  switch (action.type) {
    case "CHOOSE_STATE_AMERICA":
      return {
        ...state,
        chosenState: action.chosenState,
        cityList: yelpCitiesUS[action.chosenState],
        counter: state.counter + 1,
        menu2Disabled: false,
      };
    case "DISABLE_MENU2_AMERICA":
      return {
        ...state,
        menu2Disabled: true,
        cityList: yelpCitiesUS["Arizona"],
      };
    case "CHOOSE_CITY_AMERICA":
      return { ...state, chosenCity: action.chosenCity };
  }
  return state;
}
