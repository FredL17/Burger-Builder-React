import React from "react";
import classes from "./BuildControls.module.css";
import BuildControl from "./BuildControl/BuildControl";

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" }
];

function BuildControls(props) {
  return (
    <div className={classes.BuildControls}>
      <h3>Price: ${props.price}</h3>
      {controls.map(control => (
        <BuildControl
          key={control.label}
          label={control.label}
          addIngredient={props.addIngredient.bind(this, control.type)}
          deleteIngredient={props.deleteIngredient.bind(this, control.type)}
          disabled={props.disabledBtnInfo[control.type]}
        />
      ))}
      <button
        className={classes.OrderButton}
        disabled={!props.orderState}
        onClick={props.order}
      >
        {props.isAuthenticated ? "Order Now" : "Sign Up to Order"}
      </button>
    </div>
  );
}

export default BuildControls;
