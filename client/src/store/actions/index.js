import axios from "axios";
import { GET_RATES, RATES_URL } from "../constants";

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