import React from "react";
import classes from "./Order.module.css";

function Order(props) {
  const ingredients = [];

  for (let ingredientName in props.ingredients) {
    ingredients.push({
      name: ingredientName,
      amount: props.ingredients[ingredientName]
    });
  }

  const ingredientOutput = ingredients.map(ingredient => {
    return (
      <span className={classes.OrderInfo} key={ingredient.name}>
        {ingredient.name} ({ingredient.amount})
      </span>
    );
  });
  return (
    <div className={classes.Order}>
      <p>{ingredientOutput}</p>
      <p>
        Price <strong>USD {Number.parseFloat(props.price.toFixed(2))}</strong>
      </p>
    </div>
  );
}

export default Order;
