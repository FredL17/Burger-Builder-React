import React, { Component } from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
// Components.
import CheckoutSummary from "../../components/Order/Checkout/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";

class Checkout extends Component {
  checkoutCancelHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinueHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.props.ingredients}
          cancel={this.checkoutContinueHandler}
          continue={this.checkoutContinueHandler}
        ></CheckoutSummary>
        <Route
          path={this.props.match.path + "/contact-data"}
          component={ContactData}
        />
        )} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.ingredients
  };
};

export default connect(mapStateToProps)(Checkout);
