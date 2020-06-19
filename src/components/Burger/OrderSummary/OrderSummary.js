import React, { Component, Fragment } from "react";
import Button from "../../UI/Button/Button";

class OrderSummary extends Component {
  render() {
    const ingredientSummary = Object.keys(this.props.ingredients).map(igKey => {
      return (
        <li key={igKey}>
          <span style={{ textTransform: "capitalize" }}>{igKey}</span>:{" "}
          {this.props.ingredients[igKey]}{" "}
        </li>
      );
    });
    return (
      <Fragment>
        <h3>Order Summary</h3>
        <ul>{ingredientSummary}</ul>
        <h4>Total Price: ${this.props.price}</h4>
        <p>Continue to checkout?</p>
        <Button btnType="Danger" clicked={this.props.cancelOrder}>
          Cancel
        </Button>
        <Button btnType="Success" clicked={this.props.continueOrder}>
          Continue
        </Button>
      </Fragment>
    );
  }
}

export default OrderSummary;
