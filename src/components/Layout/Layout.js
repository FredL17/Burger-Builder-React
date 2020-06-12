import React from "react";
import Wrapper from "../../hoc/Wrapper";

const layout = props => (
  <Wrapper>
    <div>Toolbar, SiderDrawer, Backdrop</div>
    <main>{props.children}</main>
  </Wrapper>
);

export default layout;
