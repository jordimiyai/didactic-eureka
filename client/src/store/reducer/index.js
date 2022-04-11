import { GET_RATES, GET_WALLETS } from "../constants";

const initialState = {
  exchangeRates: [],
  allWallets: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_RATES:
      return {
        ...state,
        exchangeRates: action.payload,
      };
    case GET_WALLETS:
      return {
        ...state,
        allWallets: action.payload,
      };

    default:
      return state;
  }
}
