import React from "react";
import classes from "./ToolBar.module.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import DrawerToggle from "../SideDrawer/DrawerToggle/DrawerToggle";

function ToolBar(props) {
  return (
    <header className={classes.ToolBar}>
      <DrawerToggle clicked={props.sideDrawerToggleClicked}></DrawerToggle>
      <Logo height="80%"></Logo>
      <nav className={classes.DesktopOnly}>
        <NavigationItems isAuthenticated={props.isAuthenticated} />
      </nav>
    </header>
  );
}

export default ToolBar;
