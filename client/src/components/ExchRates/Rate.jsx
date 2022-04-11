import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getRates } from "../../store/actions";
import { RATES_URL } from "../../store/constants";

export default function Rate(props) {
  const { id, code, rate } = props;
  const dispatch = useDispatch()
  const [edit, setEdit] = useState(false);
  const [displayRate, setDisplayRate] = useState({ newRate: rate });
  function editRate(e) {
    e.preventDefault();
    setEdit(true);
  }

  function handleChange(e) {
    e.preventDefault();
    setDisplayRate({ newRate: e.target.value });
  }
  function saveRate(e) {
    e.preventDefault();
    axios
      .patch(`${RATES_URL}/${id}`, displayRate)
      .then(() => dispatch(getRates()))
      .catch((e) => alert(e));
      setEdit(false)
  }
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ margin: "3px 20px" }}>
        <h5>{code}</h5>
        {edit ? (
          <div>
            <form className="Save" onSubmit={saveRate}>
              <input
                type="text"
                onChange={handleChange}
                value={displayRate.newRate}
              />
              <input type="submit" value="save" />
            </form>
          </div>
        ) : (
          <div>
            <button onClick={editRate}>edit</button>
            <h6>{displayRate.newRate}</h6>
          </div>
        )}
      </div>
    </div>
  );
}
