import axios from "axios";
import { GET_RATES, GET_WALLETS, RATES_URL, WALLETS_URL } from "../constants";


export function getWallets() {
  return function (dispatch) {
    axios.get(WALLETS_URL)
      .then((wallets) => {
        dispatch({
          type: GET_WALLETS,
          payload: wallets.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
}
export function getRates() {
    return function (dispatch) {
      axios
        .get(RATES_URL)
        .then((rates) => {
          dispatch({
            type: GET_RATES,
            payload: rates.data,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    };
  }
  