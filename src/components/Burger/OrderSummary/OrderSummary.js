import React, { Fragment } from "react";
import Button from "../../UI/Button/Button";

function OrderSummary(props) {
  const ingredientSummary = Object.keys(props.ingredients).map(igKey => {
    return (
      <li key={igKey}>
        <span style={{ textTransform: "capitalize" }}>{igKey}</span>:{" "}
        {props.ingredients[igKey]}{" "}
      </li>
    );
  });
  return (
    <Fragment>
      <h3>Order Summary</h3>
      <ul>{ingredientSummary}</ul>
      <h4>Total Price: ${props.price}</h4>
      <p>Continue to checkout?</p>
      <Button btnType="Danger" clicked={props.cancelOrder}>
        Cancel
      </Button>
      <Button btnType="Success" clicked={props.continueOrder}>
        Continue
      </Button>
    </Fragment>
  );
}

export default OrderSummary;
