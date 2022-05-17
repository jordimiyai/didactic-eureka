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
    <form className="Add" onSubmit={onSubmit}>
      <input style={{
              fontsize: "14px",
              height: "15px",
              padding: "5px",
              width: "10em",
            }}
        type="text"
        onChange={onInputChange}
        placeholder="Paste wallet address"
        value={address}
      />
      <input   type="submit" value="Add" style={{
              fontsize: "14px",
              padding: "5px",
            }}/>
    </form>
  );
}
