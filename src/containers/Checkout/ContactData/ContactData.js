import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import classes from "./ContactData.module.css";
import axios from "../../../axios-orders";

class ContactData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      address: {
        street: "",
        postalCode: ""
      },
      isLoading: false
    };
  }

  orderHandler = event => {
    event.preventDefault();
    this.setState(
      {
        isLoading: true
      },
      () => {
        const order = {
          ingredients: this.props.ingredients,
          price: this.props.price,
          customer: {
            name: "Feifan Lin",
            address: {
              street: "test 1",
              zipCode: "41351",
              country: "China"
            },
            email: "test1@gmail.com "
          }
        };
        axios
          .post("/orders.json", order)
          .then(res => {
            this.setState({
              isLoading: false
            });
            this.props.history.push("/");
            return res;
          })
          .catch(err => {
            this.setState({
              isLoading: false
            });
          });
      }
    );
  };

  render() {
    let form = (
      <form>
        <input
          className={classes.Input}
          type="text"
          name="name"
          placeholder="Your Name"
        />
        <input
          className={classes.Input}
          type="email"
          name="email"
          placeholder="Your Email"
        />
        <input
          className={classes.Input}
          type="text"
          name="street"
          placeholder="Street"
        />
        <input
          className={classes.Input}
          type="text"
          name="postalCode"
          placeholder="Postal Code"
        />
        <Button btnType="Success" clicked={this.orderHandler}>
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
