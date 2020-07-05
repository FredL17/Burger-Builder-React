import * as actionTypes from "../actions/actionTypes";

// Initial State.
const initialState = {
  orders: [],
  loading: false,
  purchased: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    // Update loading state when fetching orders starts.
    case actionTypes.FETCH_ORDERS_START:
      return {
        ...state,
        loading: true
      };
    // Update loading and orders state when fetching orders succeeds.
    case actionTypes.FETCH_ORDERS_SUCCESS:
      return {
        ...state,
        orders: action.orders,
        loading: false
      };
    // Update loading state when fetching orders fails.
    case actionTypes.FETCH_ORDERS_FAIL:
      return {
        ...state,
        loading: false
      };
    // Update purchased state when purchasing initializes.
    case actionTypes.PURCHASE_INIT:
      return {
        ...state,
        purchased: false
      };
    // Update states when purchasing succeeds.
    case actionTypes.PURCHASE_BURGER_SUCCESS:
      const newOrder = {
        ...action.orderData,
        id: action.orderId
      };
      return {
        ...state,
        loading: false,
        purchased: true,
        orders: state.orders.concat(newOrder)
      };
    // Update loading state when purchasing starts.
    case actionTypes.PURCHASE_BURGER_START:
      return {
        ...state,
        loading: true
      };
    // Update loading state when purchasing fails.
    case actionTypes.PURCHASE_BURGER_FAIL:
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
};

export default reducer;
