import React, { useState } from "react";

export default function SortBy(props) {
  const { updateDisplay } = props;
  const [favFirst, setfavFirst] = useState(false);

  function handleClickFav(e) {
    e.preventDefault();
    setfavFirst(true)
    updateDisplay(true);
  }
  function handleClickDefault(e) {
    e.preventDefault();
    setfavFirst(false)
    updateDisplay(false);
  }
  return (
    <div style={{margin:' 0em 1em'}}>
      
      <button onClick={(e) => handleClickFav(e)} value={favFirst} style={{
              fontsize: "14px",
              padding: "5px"}}>
        Favorites First
      </button>
      <button onClick={(e) => handleClickDefault(e)} value={favFirst}  style={{
              fontsize: "14px",
              padding: "5px", margin:'0em 1em'}}>
        Show by default
      </button>
      
    </div>
  );
}
