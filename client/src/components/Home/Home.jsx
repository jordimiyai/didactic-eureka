import React, { useEffect, useState } from "react";
import NavBar from "../NavBar/NavBar";
import axios from "axios";
import Wallets from "../Wallets/Wallets";
import { useDispatch, useSelector } from "react-redux";
import { getRates, getWallets } from "../../store/actions";
import AddWallet from "../AddWallet/AddWallet";

export default function Home() {
  const dispatch = useDispatch();
  const exchangeRates = useSelector((state) => state.exchangeRates);
  useEffect(() => {
    dispatch(getRates());
  }, []);

  const allWallets = useSelector((state) => state.allWallets);
  useEffect(() => {
    dispatch(getWallets());
  }, []);

  console.log(allWallets);

  return (
    <div>
      <h1>Digital Wallet Dashboard</h1>

      <NavBar rates={exchangeRates} />
      <AddWallet allWallets={allWallets} />
      <Wallets allWallets={allWallets} />
    </div>
  );
}
