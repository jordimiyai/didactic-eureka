import axios from "axios";
import { GET_RATES, GET_WALLETS,API_URL } from "../constants";


export function getWallets(checked) {
  return function (dispatch) {
    axios.get(`${API_URL}/wallets?sorted=${checked}`)
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
        .get(API_URL + "/eRates")
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
  