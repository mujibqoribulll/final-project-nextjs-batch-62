import React from "react";
import { FcLike } from "react-icons/fc";
import { IoHeartDislikeSharp } from "react-icons/io5";

const ButtonImage = (props) => {
  const { onPress, icon, type = "default", isLike = false } = props;
  const WHITELIST_TYPE = ["like", "replies"];

  const typeOfButton = () => {
    if (type === "default") {
      return <button onClick={onPress}>{icon}</button>;
    } else if (WHITELIST_TYPE.includes(type)) {
      return (
        <button onClick={onPress}>
          {isLike ? <FcLike size={25} /> : <IoHeartDislikeSharp size={25} />}
        </button>
      );
    }
  };
  return <button onClick={onPress}>{icon}</button>;
};

export default ButtonImage;
