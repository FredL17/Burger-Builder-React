import React, { Fragment, Component } from "react";
import ToolBar from "../UI/Navigation/ToolBar/ToolBar";
import classes from "./Layout.module.css";
import SiderDrawer from "../UI/Navigation/SideDrawer/SideDrawer";

class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSideDrawer: false
    };
  }

  sideDrawerClosedHandler = () => {
    this.setState({
      showSideDrawer: false
    });
  };

  sideDrawerToggleHandler = () => {
    this.setState(prevState => {
      return {
        showSideDrawer: !prevState.showSideDrawer
      };
    });
  };

  render() {
    return (
      <Fragment>
        <ToolBar
          sideDrawerToggleClicked={this.sideDrawerToggleHandler}
        ></ToolBar>
        <SiderDrawer
          open={this.state.showSideDrawer}
          closed={this.sideDrawerClosedHandler}
        ></SiderDrawer>
        <main className={classes.Content}>{this.props.children}</main>
      </Fragment>
    );
  }
}

export default Layout;
