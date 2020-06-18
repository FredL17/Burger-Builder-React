import React from "react";
import classes from "./BackDrop.module.css";

function BackDrop(props) {
  const backdrop = props.show ? (
    <div className={classes.BackDrop} onClick={props.clicked}></div>
  ) : null;
  return backdrop;
}

export default BackDrop;
