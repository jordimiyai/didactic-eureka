import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import {
  faArrowAltCircleUp,
  faWarning,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
export default function Balance(props) {
  const { walletInfo, toggleShow } = props;
  const exchangeRates = useSelector((state) => state.exchangeRates);

  const [convertedBalance, setconvertedBalance] = useState(walletInfo.balance);
  function handleRates(e) {
    e.preventDefault();
    setconvertedBalance(e.target.value * walletInfo.balance);
  }

  return (
    <div>
      {walletInfo.isOld ? (
        <p
          style={{
            backgroundColor: "pink",
            color: "red",
            margin: "1em 15em",
            borderRadius: "2px",
          }}
        >
          <FontAwesomeIcon icon={faWarning} />
          Wallet is Old
        </p>
      ) : (
        ""
      )}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          margin: "1em 10em",
        }}
      >
        <div
          style={{
            justifyContent: "center",
            margin: "0em 1em",
            backgroundColor: "#f1f1f1",
            borderRadius: "2px",
            padding: "1em",
            width: "15em",
            height: "7em",
            alignItems: 'flex-start',

          }}
        >
          <p>Ether</p>
          <h3>{walletInfo.balance}</h3>
        </div>
        <div
          style={{
            justifyContent: "center",
            backgroundColor: "#f1f1f1",
            borderRadius: "2px",
            padding: "1em",
            width: "15em",
            height: "7em",
            alignItems: 'flex-start',
          }}
        >
          <select
            onChange={(e) => handleRates(e)}
            style={{
              fontsize: "14px",
              height: "30px",
              padding: "5px",
              width: "10em",
            }}
          >
            {exchangeRates.map((rate) => {
              return (
                <option key={rate.id} value={rate.rate}>
                  {rate.rate + " " + rate.code}
                </option>
              );
            })}
          </select>
          <h3>{convertedBalance}</h3>
        </div>
      </div>
      <button onClick={(e) => toggleShow(e)} style={{border:'0', background: 'transparent' }}>
        {" "}
        <FontAwesomeIcon icon={faArrowAltCircleUp} />
      </button>
    </div>
  );
}
