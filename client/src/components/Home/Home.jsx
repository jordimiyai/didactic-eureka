import React, { useEffect, useState } from "react";
import NavBar from "../NavBar/NavBar";
import Wallets from "../Wallets/Wallets";
import { useDispatch, useSelector } from "react-redux";
import { getRates, getWallets } from "../../store/actions";
import AddWallet from "../AddWallet/AddWallet";
import SortBy from "../SortBy/SortBy";

export default function Home() {
  const dispatch = useDispatch();
  const exchangeRates = useSelector((state) => state.exchangeRates);
  useEffect(() => {
    dispatch(getRates());
  }, [dispatch]);
  const [updated, setupdated] = useState(false);

  const allWallets = useSelector((state) => state.allWallets);
  useEffect(() => {
    dispatch(getWallets(updated));
  }, [dispatch, updated]);

  const img = "https://jordimiyai-thumbnail.s3.amazonaws.com/florabeja_160x120.jpg?AWSAccessKeyId=AKIAYA3LETD3TYGLKEEO&Expires=1651683744&Signature=LMiXx%2FfVSF12YSZkt7EJ4akYIZw%3D"
  const updateDisplay = (value) => {
    setupdated(value);
  };

  return (
    <div>
      <h1>Digital Wallet Dashboard</h1>

      <NavBar rates={exchangeRates} />
      <div style={{display:"flex", flexDirection:'row', justifyContent:'center', padding: "1em", alignContent:'center'}}>
      <AddWallet allWallets={allWallets} />        
      <SortBy updateDisplay={updateDisplay}/>
      </div>
      <Wallets allWallets={allWallets} />
    </div>
  );
}
