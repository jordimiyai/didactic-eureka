import React, { useState } from "react";
import { useDispatch } from "react-redux";

export default function SortBy(props) {
  const { updateDisplay } = props;
  const dispatch = useDispatch();
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
    <div>
      
      <button onClick={(e) => handleClickFav(e)} value={favFirst}>
        Favorites First
      </button>
      <button onClick={(e) => handleClickDefault(e)} value={favFirst}>
        Show by default
      </button>
      
    </div>
  );
}
