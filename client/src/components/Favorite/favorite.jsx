import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeartCircleMinus,
  faHeartCirclePlus,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { WALLETS_URL } from "../../store/constants";

export default function Favorite(props) {
  const { isFav, id } = props;
  const [favStatus, setFavStatus] = useState({ favStatus: isFav });

  function handleClickAdd(e) {
    axios
      .patch(`${WALLETS_URL}/${id}`, {favStatus: true })
      .then((res) => console.log(res, 'add'))
      .catch((e) => {
        alert(e);
      });
      setFavStatus({favStatus: true });

  }

  function handleClickRemove(e) {

    axios
      .patch(`${WALLETS_URL}/${id}`, { favStatus: false })
      .then((res) => console.log(res))
      .catch((e) => {
        alert(e);
      });
      setFavStatus({ favStatus: false });
  }
  return (
    <div>
      {favStatus.favStatus ? (
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
