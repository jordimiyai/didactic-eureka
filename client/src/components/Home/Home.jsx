import React, { useEffect, useState } from "react";
import NavBar from "../NavBar/NavBar";
import axios from "axios";
import Wallets from "../Wallets/Wallets";
import { useDispatch, useSelector } from "react-redux";
import { getRates } from "../../store/actions";

export default function Home() {
  const dispatch = useDispatch()
  const exchangeRates = useSelector((state) => state.exchangeRates);
  useEffect(()=>{
    dispatch(getRates())
  },[])

  const [allWallets, setAllWallets] = useState(null);
  useEffect(() => {
    axios.get(`http://localhost:3001/wallets/`).then(res=> {
        setAllWallets(res.data);
    })
  }, []);

  console.log(allWallets)

  return (
    <div>
              home

      <NavBar rates={exchangeRates}/>
      <Wallets allWallets={allWallets}/>
    </div>
  );
}
