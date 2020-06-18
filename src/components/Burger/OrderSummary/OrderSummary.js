import React, { Fragment } from "react";

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
    </Fragment>
  );
}

export default OrderSummary;
