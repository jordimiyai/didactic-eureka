import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getRates } from "../../store/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import { API_URL } from "../../store/constants";
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
      .patch(`${API_URL}/eRates/${id}`, displayRate)
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
      <div style={{ margin: "3px 10px 1px" , display:'flex', flexDirection:'row', alignItems:'center'}}>
        <h6 style={{ margin: "3px 10px 1px" }}>{code}</h6>
        {edit ? (
          <div>
            <form className="Save" onSubmit={saveRate}>
              <input 
                type="text"
                onChange={handleChange}
                value={displayRate.newRate}
                style={{width: "3em"}}
              />
              <input type="submit" value="save" />
            </form>
          </div>
        ) : (
          <div style={{display:'flex', flexDirection:'row', margin: "3px 20px" }}>
                        <h6>{displayRate.newRate}</h6>

            <button onClick={editRate} style={{border:'0', background: 'transparent' }}><FontAwesomeIcon icon={faEdit} /></button>
          </div>
        )}
      </div>
    </div>
  );
}
