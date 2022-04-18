import React from "react";
import ExchRates from "../ExchRates/ExchRates";

export default function NavBar(props) {
  const { rates } = props;
  return (
    <div>
      <div style={{background:'#FED8B1', display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
      <h5>Add your Ethereum wallets and check their value in</h5>
        <ExchRates rates={rates} />
      </div>
    </div>
  );
}
