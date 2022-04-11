import React from "react";

export default function Wallet(props){
    const { id, isFav, address } = props
    return <div>
        <p>Address: </p>
        <p>{address}</p>
        {isFav ? <div>fav ok</div>: <div>add to fav</div> }

    </div>
}