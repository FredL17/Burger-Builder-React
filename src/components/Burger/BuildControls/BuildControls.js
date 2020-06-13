import React from "react";
import classes from "./BuildControls.module.css";
import BuildControl from "./BuildControl/BuildControl";

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" }
];

const buildControls = props => (
  <div className={classes.BuildControls}>
    {controls.map(control => (
      <BuildControl
        key={control.label}
        label={control.label}
        addIngredient={props.addIngredient.bind(this, control.type)}
        deleteIngredient={props.deleteIngredient.bind(this, control.type)}
      />
    ))}
  </div>
);

export default buildControls;
