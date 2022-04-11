import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { WALLETS_URL } from "../../store/constants";
export default function Balance(props) {
  const { walletInfo, toggleShow } = props;
  const exchangeRates = useSelector((state) => state.exchangeRates);

  const [convertedBalance, setconvertedBalance] = useState(walletInfo.balance)
  function handleRates(e){
    e.preventDefault()
    setconvertedBalance(e.target.value * walletInfo.balance)
  }


  return (
    <div>
      {walletInfo.isOld ? <p>"Wallet is Old" </p> : ""}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <div>
          <p>Ether: </p>
          <>{walletInfo.balance}</>
        </div>
        <div>
          <select onChange={(e) => handleRates(e)}>
            <option value={1}>Exchange Rates </option>
            {exchangeRates.map((rate) => {
              return (
                <option key={rate.id} value={rate.rate}>
                  {rate.rate + " " + rate.code}
                </option>
              );
            })}
          </select>
          <p>{convertedBalance}</p>
        </div>
      </div>
      <button onClick={(e) => toggleShow(e)}>Ocultar</button>
    </div>
  );
}
