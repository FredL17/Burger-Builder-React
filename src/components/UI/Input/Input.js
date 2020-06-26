import React from "react";
import classes from "./Input.module.css";

function Input(props) {
  let inputElement = null;
  const inputClasses = [classes.InputElement];

  if (props.invalid && props.shouldValidate && props.touched) {
    inputClasses.push(classes.Invalid);
  }

  switch (props.elementType) {
    case "input":
      inputElement = (
        <input
          value={props.value}
          {...props.elementConfig}
          className={inputClasses.join(" ")}
          onChange={props.changed}
        />
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          value={props.value}
          {...props.elementConfig}
          className={inputClasses.join(" ")}
          onChange={props.changed}
        />
      );
      break;
    case "select":
      inputElement = (
        <select
          value={props.value}
          className={inputClasses.join(" ")}
          onChange={props.changed}
        >
          {props.elementConfig.options.map(option => {
            return (
              <option key={option.value} value={option.value}>
                {option.displayValue}
              </option>
            );
          })}
        </select>
      );
      break;
    default:
      inputElement = (
        <input
          value={props.value}
          {...props.elementConfig}
          className={inputClasses.join(" ")}
        />
      );
      break;
  }

  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
    </div>
  );
}

export default Input;
