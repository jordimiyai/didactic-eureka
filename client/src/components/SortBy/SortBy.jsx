import React from "react";
import { useDispatch } from "react-redux";

export default function SortBy(props) {
  const { updateDisplay } = props;
  const dispatch = useDispatch();

  function handleCheck(e) {
    e.preventDefault();
    console.log(e.target.checked);
    if (e.target.checked === true) {
      updateDisplay(true);
    } else dispatch(false);
  }
  return (
    <div>
      <label>
        <input type="checkbox" onChange={(e) => handleCheck(e)} /> Favorites
        First
      </label>
    </div>
  );
}
