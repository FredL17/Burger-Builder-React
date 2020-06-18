import React from "react";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";
import classes from "./Burger.module.css";

function Burger(props) {
  let transformedIngredients = [];

  for (let ingredient of Object.keys(props.ingredients)) {
    const count = props.ingredients[ingredient];
    for (let i = 0; i < count; i++) {
      transformedIngredients.push(
        <BurgerIngredient key={ingredient + i} type={ingredient} />
      );
    }
  }

  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>Please start adding ingredients.</p>;
  }

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top"></BurgerIngredient>
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom"></BurgerIngredient>
    </div>
  );
}

export default Burger;
