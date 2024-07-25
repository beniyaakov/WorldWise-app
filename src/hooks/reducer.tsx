import { ApiType, CurrentCityType } from "../contexts/CitiesContexts";

type ActionType =
  | { type: "loading" }
  | { type: "rejected"; payload: string }
  | { type: "cities/loaded"; payload: ApiType[] }
  | { type: "city/loaded"; payload: CurrentCityType }
  | { type: "city/created"; payload: ApiType }
  | { type: "city/deleted"; payload: string };

type StateType = {
  cities: ApiType[];
  isLoading: boolean;
  currentCity: CurrentCityType;
  error: string;
};

export const initialState: StateType = {
  cities: [],
  isLoading: false,
  currentCity: { cityName: "", emoji: "", date: "", notes: "", id: "" },
  error: "",
};

export default function reducer(state: StateType, action: ActionType) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "cities/loaded":
      return { ...state, isLoading: false, cities: action.payload };
    case "city/loaded":
      return { ...state, isLoading: false, currentCity: action.payload };
    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity:action.payload
      };
    //   return { ...state,isLoading: false,cities: state.cities ? [...state.cities, action.payload] : [action.payload],currentCity:action.payload};
    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity:{ cityName: "", emoji: "", date: "", notes: "", id: "" }
      };
    case "rejected":
      return { ...state, isLoading: false, error: action.payload };

    default:
      throw new Error("something went wrong. Unknown action type");
  }
}
