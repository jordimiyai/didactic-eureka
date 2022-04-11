import { GET_RATES } from "../constants";

const initialState = {
  exchangeRates: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_RATES:
      return {
        ...state,
        exchangeRates: action.payload,
      };
    default:
      return state;
  }
}
