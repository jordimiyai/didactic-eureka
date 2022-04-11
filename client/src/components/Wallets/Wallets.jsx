import React from "react";
import Wallet from "../Wallet/Wallet";

export default function Wallets(props) {
  const { allWallets } = props;
  console.log(allWallets, "enwall");
  return (
    <div>
      <h2>Your Wallets</h2>

      {allWallets ? (
        allWallets.map((wal) => {
          return (
            <div
              style={{
                background: "#f2f2f2",
                margin: "0.5em 20em",
                padding: "1em 3em",
                width: "50%",
              }}
            >
              <Wallet
                key={wal.id}
                id={wal.id}
                address={wal.address}
                isFav={wal.isFavorite}
              />
            </div>
          );
        })
      ) : (
        <div>Add a wallet</div>
      )}
    </div>
  );
}
