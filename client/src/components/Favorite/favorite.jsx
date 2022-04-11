import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeartCircleMinus,
  faHeartCirclePlus,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { WALLETS_URL } from "../../store/constants";
import { getWallets } from "../../store/actions";

export default function Favorite(props) {
  const { isFav, id } = props;

  const [favStatus, setFavStatus] = useState({ favStatus: isFav });
  function handleClickAdd(e) {
    setFavStatus(true);
    axios
      .patch(`${WALLETS_URL}/${id}`, favStatus)
      .then((res) => console.log(res))
      .catch((e) => {
        alert(e);
        setFavStatus({ favStatus: false });
      });
  }

  function handleClickRemove(e) {
    setFavStatus(false);
    axios
      .patch(`${WALLETS_URL}/${id}`, favStatus)
      .then((res) => console.log(res))
      .catch((e) => {
        alert(e);
        setFavStatus({ favStatus: true });
      });
  }
  return (
    <div>
      {favStatus ? (
        <button onClick={handleClickRemove}>
          <FontAwesomeIcon icon={faHeartCircleMinus} />
        </button>
      ) : (
        <button onClick={handleClickAdd}>
          <FontAwesomeIcon icon={faHeartCirclePlus} />
        </button>
      )}
    </div>
  );
}
