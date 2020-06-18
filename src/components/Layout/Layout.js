import React, { Fragment } from "react";

function Layout(props) {
  return (
    <Fragment>
      <div>Toolbar, SiderDrawer, Backdrop</div>
      <main>{props.children}</main>
    </Fragment>
  );
}

export default Layout;
