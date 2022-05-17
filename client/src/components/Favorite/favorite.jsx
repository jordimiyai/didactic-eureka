import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeartCircleMinus,
  faHeartCirclePlus,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { API_URL } from "../../store/constants";

export default function Favorite(props) {
  const { isFav, id } = props;
  const [favStatus, setFavStatus] = useState({ favStatus: isFav });

  function handleClickAdd(e) {
    axios
      .patch(`${API_URL}/wallets/${id}`, {favStatus: true })
      .then((res) => console.log(res, 'add'))
      .catch((e) => {
        alert(e);
      });
      setFavStatus({favStatus: true });

  }

  function handleClickRemove(e) {

    axios
      .patch(`${API_URL}/wallets/${id}`, { favStatus: false })
      .then((res) => console.log(res))
      .catch((e) => {
        alert(e);
      });
      setFavStatus({ favStatus: false });
  }
  return (
    <div>
      {favStatus.favStatus ? (
        <button onClick={handleClickRemove} style={{color:'red',border:'0', background: 'transparent'  }}>
          <FontAwesomeIcon icon={faHeartCircleMinus} />
        </button>
      ) : (
        <button onClick={handleClickAdd} style={{border:'0', background: 'transparent' }}>
          <FontAwesomeIcon icon={faHeartCirclePlus} />
        </button>
      )}
    </div>
  );
}
