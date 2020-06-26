import React, { Component } from "react";
import Order from "../../components/Order/Order";
import axios from "../../axios-orders";
import errorHandler from "../../hoc/errorHandler/errorHandler";

class Orders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      isLoading: true
    };
  }

  componentDidMount() {
    // Fetch the orders from the firebase.
    axios
      .get("/orders.json")
      .then(res => {
        const fetchedOrders = [];
        for (let key in res.data) {
          fetchedOrders.push({
            ...res.data[key],
            id: key
          });
        }

        this.setState({
          orders: fetchedOrders,
          isLoading: false
        });
      })
      .catch(err => {
        this.setState({
          isLoading: false
        });
      });
  }

  render() {
    return (
      <div>
        {this.state.orders.map(order => {
          return (
            <Order
              key={order.id}
              ingredients={order.ingredients}
              price={order.price}
            ></Order>
          );
        })}
      </div>
    );
  }
}

export default errorHandler(Orders, axios);
