import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getWallets } from "../../store/actions";
import { API_URL } from "../../store/constants";

export default function AddWallet(props) {
  const dispatch = useDispatch();

  const { allWallets } = props;
  const [address, setAddress] = useState("");
  function walletExist(allWallets, newWall) {
    const isPosted = allWallets.filter((wallet) => wallet.address === newWall);
    if (isPosted.length > 0) {
      return true;
    }
    return false;
  }
  useEffect(() => {
    dispatch(getWallets());
  }, [dispatch]);

  function onSubmit(e) {
    e.preventDefault();
    if (walletExist(allWallets, address)) {
      alert("The wallet is Already posted");
    } else {
      axios
        .post(`${API_URL}/wallets`, { address: address })
        .then((response) => {
          dispatch(getWallets());
        })
        .catch((error) => {
          alert("Wallet Not found");
        });
    }
    setAddress("");
  }

  function onInputChange(e) {
    e.preventDefault();
    setAddress(e.target.value);
  }
  return (
    <form onSubmit={onSubmit}>
      <input 
        type="text"
        onChange={onInputChange}
        placeholder="Paste wallet address"
        value={address}
      />
      <input   type="submit" value="Add" className='btn btn-primary'/>
    </form>
  );
}
