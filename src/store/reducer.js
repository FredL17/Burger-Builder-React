import * as actionTypes from "./actions";

// Initial State.
const initialState = {
  ingredients: {
    salad: 0,
    bacon: 0,
    cheese: 0,
    meat: 0
  },
  totalPrice: 0
};

// Prices for each ingredient.
const INGREDIENT_PRICES = {
  salad: 1,
  bacon: 2,
  cheese: 1.5,
  meat: 2
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return {
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1
        }
      };
    case actionTypes.REMOVE_INGREDIENT:
      return {
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] - 1
        }
      };
    default:
      return state;
  }
};

export default reducer;
