import React, { Component } from "react";
import Wrapper from "../../hoc/Wrapper";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";

// Prices for each ingredient.
const INGREDIENT_PRICES = {
  salad: 1,
  bacon: 2,
  cheese: 1.5,
  meat: 2
};

class BurgerBuilder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0
      },
      totalPrice: 10
    };
  }

  // Increase the selected ingredient by 1 and update the price accordingly.
  addIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    const oldPrice = this.state.totalPrice;
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const newPrice = oldPrice + INGREDIENT_PRICES[type];
    // This method is async.
    this.setState({
      ingredients: updatedIngredients,
      totalPrice: newPrice
    });
  };

  // Decrease the selected ingredient by 1 and update the price accordingly.
  deleteIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    if (oldCount !== 0) {
      const oldPrice = this.state.totalPrice;
      const updatedCount = oldCount - 1;
      const updatedIngredients = {
        ...this.state.ingredients
      };
      updatedIngredients[type] = updatedCount;
      const newPrice = oldPrice - INGREDIENT_PRICES[type];
      // This method is async.
      this.setState({
        ingredients: updatedIngredients,
        totalPrice: newPrice
      });
    }
  };

  // Render the component.
  render() {
    return (
      <Wrapper>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          addIngredient={this.addIngredientHandler}
          deleteIngredient={this.deleteIngredientHandler}
        />
      </Wrapper>
    );
  }
}

export default BurgerBuilder;
