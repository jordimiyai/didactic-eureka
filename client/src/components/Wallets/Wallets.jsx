import React from "react";
import Wallet from "../Wallet/Wallet";

export default function Wallets(props) {
  const { allWallets } = props;
  console.log(allWallets,'enwall')
  return (
    <div>
      {allWallets ? (
        allWallets.map((wal) => {
          return (
            <Wallet
              key={wal.id}
              id={wal.id}
              address={wal.address}
              isFav={wal.isFavorite}
            />
          );
        })
      ) : (
        <div>Add a wallet</div>
      )}
    </div>
  );
}
