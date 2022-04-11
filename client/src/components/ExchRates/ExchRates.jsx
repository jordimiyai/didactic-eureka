import React from "react";
import Rate from "./Rate";

export default function ExchRates(props) {
  const { rates } = props;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {rates.map((r) => {
        return (
          <Rate id={r._id} code={r.code} rate={r.rate} key={r._id}/>
  
        );
      })}
    </div>
  );
}
