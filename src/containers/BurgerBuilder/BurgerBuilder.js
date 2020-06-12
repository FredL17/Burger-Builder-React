import React, { Component } from "react";
import Wrapper from "../../hoc/Wrapper";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";

class BurgerBuilder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredient: {
        salad: 1,
        bacon: 1,
        cheese: 2,
        meat: 2
      }
    };
  }

  render() {
    return (
      <Wrapper>
        <Burger ingredient={this.state.ingredient}></Burger>
        <BuildControls></BuildControls>
      </Wrapper>
    );
  }
}

export default BurgerBuilder;
