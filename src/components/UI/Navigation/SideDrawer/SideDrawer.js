import React, { Fragment } from "react";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import classes from "./SiderDrawer.module.css";
import BackDrop from "../../BackDrop/BackDrop";

function SiderDrawer(props) {
  let attacedClasses = [classes.SiderDrawer, classes.Close];
  if (props.open) {
    attacedClasses = [classes.SiderDrawer, classes.Open];
  }

  return (
    <Fragment>
      <BackDrop show={props.open} clicked={props.closed}></BackDrop>
      <div className={attacedClasses.join(" ")}>
        <Logo height="11%" />
        <nav>
          <NavigationItems></NavigationItems>
        </nav>
      </div>
    </Fragment>
  );
}

export default SiderDrawer;
