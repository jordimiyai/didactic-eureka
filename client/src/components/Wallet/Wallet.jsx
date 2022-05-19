import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useState } from "react";
import Favorite from "../Favorite/favorite";
import Balance from "./Balance";
import { faArrowAltCircleDown } from "@fortawesome/free-solid-svg-icons";
import { API_URL, WEI_TO_ETHEREUM_RATE } from "../../store/constants";
export default function Wallet(props) {
  const { id, isFav, address } = props;
  const [walletInfo, setWalletInfo] = useState({
    balance: 0,
    isOld: false,
    show: false,
  });

  function toggleShow(e) {
    e.preventDefault();
    if (!walletInfo.show) {
      axios
        .get(`${API_URL}/wallets/${id}`)
        .then((response) => {
          setWalletInfo({
            balance: response.data.balanceWei / WEI_TO_ETHEREUM_RATE,
            isOld: response.data.isOld,
            show: true,
          });
        })
        .catch((e) => alert(e));
    } else {
      setWalletInfo({
        ...walletInfo,
        show: false,
      });
    }
  }

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <p style={{ margin: "10px" }}>{address}</p>
        <Favorite isFav={isFav} id={id} />
      </div>
      {walletInfo.show ? (
        <Balance walletInfo={walletInfo} toggleShow={toggleShow} />
      ) : (
        <button onClick={(e) => toggleShow(e)} style={{border:'0', background: 'transparent' }}>
          <FontAwesomeIcon icon={faArrowAltCircleDown} />
        </button>
      )}
    </div>
  );
}
