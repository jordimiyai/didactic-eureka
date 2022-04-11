import React from "react";
import Favorite from "../Favorite/favorite";

export default function Wallet(props){
    const { id, isFav, address } = props

    return <div> <div style={{display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
        <p style={{margin:'10px'}}>Address: </p>
        <p style={{margin:'10px'}}>{address}</p>
        <Favorite isFav={isFav}/>
        </div>
        <button>ver mas</button>

    </div>
}