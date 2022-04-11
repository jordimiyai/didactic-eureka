import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faHeart } from "@fortawesome/free-solid-svg-icons";

export default function Favorite(props) {
  const { isFav } = props;
  return (
    <div>
      {isFav ? (
        <FontAwesomeIcon icon={faHeart} />
      ) : (
        <FontAwesomeIcon icon={faHeart} />
      )}
    </div>
  );
}
