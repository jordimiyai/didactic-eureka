import React from "react";
import ExchRates from "../ExchRates/ExchRates";

export default function NavBar(props) {
  const { rates } = props;
  return (
    <div>
      <p>Add your Ethereum wallets and check their value in </p>
      <ExchRates rates={rates} />
    </div>
  );
}
