import React, { Component } from "react";
// Components.
import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
// CSS.
import classes from "./ContactData.module.css";
// Axios instance.
import axios from "../../../axios-orders";

class ContactData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // Manage order submission form.
      orderForm: {
        name: {
          elementType: "input",
          elementConfig: {
            type: "text",
            placeholder: "Your Name"
          },
          value: "",
          validation: {
            required: true
          },
          valid: false,
          touched: false
        },
        street: {
          elementType: "input",
          elementConfig: {
            type: "text",
            placeholder: "Street"
          },
          value: "",
          validation: {
            required: true
          },
          valid: false,
          touched: false
        },
        zipCode: {
          elementType: "input",
          elementConfig: {
            type: "text",
            placeholder: "ZIP Code"
          },
          value: "",
          validation: {
            required: true,
            minLength: 5,
            maxLength: 5
          },
          valid: false,
          touched: false
        },
        country: {
          elementType: "input",
          elementConfig: {
            type: "text",
            placeholder: "Country"
          },
          value: "",
          validation: {
            required: true
          },
          valid: false,
          touched: false
        },
        email: {
          elementType: "input",
          elementConfig: {
            type: "email",
            placeholder: "Your Email"
          },
          value: "",
          validation: {
            required: true
          },
          valid: false,
          touched: false
        },
        deliveryMethod: {
          elementType: "select",
          elementConfig: {
            options: [
              { value: "fastest", displayValue: "Fastest" },
              { value: "cheapest", displayValue: "Cheapest" }
            ]
          },
          value: "fastest",
          validation: {},
          valid: true
        }
      },
      isLoading: false,
      formIsValid: false
    };
  }

  // Handle order submission.
  orderHandler = event => {
    // Prevent default form behavior.
    event.preventDefault();
    this.setState(
      {
        isLoading: true
      },
      () => {
        // Extract form data.
        const formData = {};
        for (let formElementId in this.state.orderForm) {
          formData[formElementId] = this.state.orderForm[formElementId].value;
        }
        const order = {
          ingredients: this.props.ingredients,
          price: this.props.price,
          orderData: formData
        };
        // Send post request to firebase.
        axios
          .post("/orders.json", order)
          .then(res => {
            this.setState({
              isLoading: false
            });
            // Navigate back to home page after order is submitted.
            this.props.history.push("/");
            return res;
          })
          .catch(err => {
            console.log(err);
            this.setState({
              isLoading: false
            });
          });
      }
    );
  };

  // Check validity of each form input field.
  checkInputValidity(value, rules) {
    let isValid = true;
    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }
    return isValid;
  }

  // Update state when form is changed.
  inputChangeHandler = (event, inputId) => {
    const updatedOrderForm = {
      ...this.state.orderForm
    };
    // Deep copy the selected form element.
    const updatedFormElement = {
      ...updatedOrderForm[inputId]
    };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkInputValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedFormElement.touched = true;
    updatedOrderForm[inputId] = updatedFormElement;
    // Update overall form validity.
    let formIsValid = true;
    for (let inputId in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputId].valid && formIsValid;
    }
    // Update the state.
    this.setState({
      orderForm: updatedOrderForm,
      formIsValid: formIsValid
    });
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key]
      });
    }

    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementsArray.map(formElement => {
          return (
            <Input
              key={formElement.id}
              elementType={formElement.config.elementType}
              elementConfig={formElement.config.elementConfig}
              value={formElement.config.value}
              invalid={!formElement.config.valid}
              shouldValidate={formElement.config.validation}
              touched={formElement.config.touched}
              changed={event => this.inputChangeHandler(event, formElement.id)}
            />
          );
        })}
        <Button btnType="Success" disabled={!this.state.formIsValid}>
          ORDER
        </Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }

    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;
