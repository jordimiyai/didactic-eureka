import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useState } from "react";
import { WALLETS_URL } from "../../store/constants";
import Favorite from "../Favorite/favorite";
import Balance from "./Balance";
import { faArrowAltCircleDown } from "@fortawesome/free-solid-svg-icons";
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
        .get(`${WALLETS_URL}/${id}`)
        .then((response) => {
          setWalletInfo({
            //the balance comes in wei must convert first
            balance: response.data.balanceWei / 1000000000000000000,
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
        <p style={{ margin: "10px" }}>Address: </p>
        <p style={{ margin: "10px" }}>{address}</p>
        <Favorite isFav={isFav} id={id} />
      </div>
      {walletInfo.show ? (
        <Balance walletInfo={walletInfo} toggleShow={toggleShow} />
      ) : (
        <button onClick={(e) => toggleShow(e)}>
          <FontAwesomeIcon icon={faArrowAltCircleDown} />
        </button>
      )}
    </div>
  );
}
