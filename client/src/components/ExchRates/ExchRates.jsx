import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollar, faEuroSign } from "@fortawesome/free-solid-svg-icons";

export default function ExchRates(props) {
  const { rates } = props;
  return (
    <div style={{display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
      {rates.map((r) => {
          return (
            <div style={{margin:'3px 20px'}} key={rates.id}>
          <h5>{r.code}</h5>
          <h6>{r.rate}</h6>
        </div>
      )})}
    </div>
  );
}
