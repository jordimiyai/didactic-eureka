import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { WALLETS_URL } from "../../store/constants";
import Favorite from "../Favorite/favorite";

export default function Wallet(props) {
  const { id, isFav, address } = props;
  const exchangeRates = useSelector((state) => state.exchangeRates);
  const [walletInfo, setWalletInfo] = useState({
    balance: 0,
    isOld: false,
    show: false
  });

  function toggleShow(e) {
    e.preventDefault();
    if (!walletInfo.show) {
      axios.get(`${WALLETS_URL}/${id}`)
      .then((response) => {
        setWalletInfo({
          //the balance comes in wei must convert first
          balance: response.data.balanceWei / 1000000000000000000,
          isOld:response.data.isOld,
          show: true}
      )}).catch(e=> alert(e))
    } else{
        setWalletInfo({
            ...walletInfo,
            show:false
        })
    }
    
  }
  const [convertedBalance, setconvertedBalance] = useState(walletInfo.balance)
  function handleRates(e){
    e.preventDefault()
    setconvertedBalance(e.target.value * walletInfo.balance)
  }
  return (
    <div>
      {" "}
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
        <Favorite isFav={isFav} />
      </div>
      {walletInfo.show ? (
        <div>
          {walletInfo.isOld ? <p>"Wallet is Old" </p>: ""}
          <div style={{display:'flex', flexDirection:'row', justifyContent:'center' }}>
          <div>
          <p>Ether: </p>
          <>{walletInfo.balance}</>
          </div>
          <div>
          <select onChange={e=> handleRates(e)}>
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
      ) : (
        <button onClick={(e) => toggleShow(e)}>Ver Mas</button>
      )}
    </div>
  );
}
