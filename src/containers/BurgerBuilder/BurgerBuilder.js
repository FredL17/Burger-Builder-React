import React, { Component, Fragment } from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import errorHandler from "../../hoc/errorHandler/errorHandler";
import axios from "../../axios-orders";

// Prices for each ingredient.
const INGREDIENT_PRICES = {
  salad: 1,
  bacon: 2,
  cheese: 1.5,
  meat: 2
};

class BurgerBuilder extends Component {
  // Constructor method.
  constructor(props) {
    super(props);
    this.state = {
      ingredients: null,
      totalPrice: 0,
      orderState: false,
      showModal: false,
      isLoading: false,
      error: false
    };
  }

  componentDidMount() {
    axios
      .get("/ingredients.json")
      .then(res => {
        this.setState({
          ingredients: res.data
        });
      })
      .catch(err => {
        this.setState({
          error: true
        });
      });
  }

  updateOrderState = () => {
    const ingredients = {
      ...this.state.ingredients
    };
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, igCount) => {
        return sum + igCount;
      }, 0);
    this.setState({
      orderState: sum > 0
    });
  };

  showModalHandler = () => {
    this.setState({
      showModal: true
    });
  };

  closeModalHandler = () => {
    this.setState({
      showModal: false
    });
  };

  cancelOrderHandler = () => {
    this.setState({
      showModal: false
    });
  };

  continueOrderHandler = () => {
    this.setState(
      {
        isLoading: true
      },
      () => {
        const order = {
          ingredients: this.state.ingredients,
          price: this.state.totalPrice,
          customer: "Feifan Lin"
        };
        axios
          .post("/orders.json", order)
          .then(res => {
            this.setState({
              isLoading: false,
              showModal: false
            });
            return res;
          })
          .catch(err => {
            this.setState({
              isLoading: false,
              showModal: false
            });
          });
      }
    );
  };

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
    this.setState(
      {
        ingredients: updatedIngredients,
        totalPrice: newPrice
      },
      this.updateOrderState
    );
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
      this.setState(
        {
          ingredients: updatedIngredients,
          totalPrice: newPrice
        },
        this.updateOrderState
      );
    }
  };

  // Render the component.
  render() {
    // If the count of an ingredient is less than or equal to 0, disable the delete button.
    const disabledBtnInfo = {
      ...this.state.ingredients
    };
    for (let key in disabledBtnInfo) {
      disabledBtnInfo[key] = disabledBtnInfo[key] <= 0;
    }

    let orderSummary = null;

    if (this.state.isLoading) {
      orderSummary = <Spinner />;
    }

    let burger = this.state.error ? (
      <p>Ingredients can't be loaded</p>
    ) : (
      <Spinner />
    );

    if (this.state.ingredients) {
      burger = (
        <Fragment>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            addIngredient={this.addIngredientHandler}
            deleteIngredient={this.deleteIngredientHandler}
            disabledBtnInfo={disabledBtnInfo}
            price={this.state.totalPrice}
            orderState={this.state.orderState}
            order={this.showModalHandler}
          />
        </Fragment>
      );

      orderSummary = (
        <OrderSummary
          cancelOrder={this.cancelOrderHandler}
          continueOrder={this.continueOrderHandler}
          ingredients={this.state.ingredients}
          price={this.state.totalPrice}
        ></OrderSummary>
      );
    }

    return (
      <Fragment>
        <Modal show={this.state.showModal} modalClosed={this.closeModalHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Fragment>
    );
  }
}

export default errorHandler(BurgerBuilder, axios);
