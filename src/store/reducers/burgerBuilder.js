import * as actionTypes from "../actions/actionTypes";

// Initial State.
const initialState = {
  ingredients: null,
  totalPrice: 0,
  error: false,
  isBuilding: false
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
    // Add ingredient.
    case actionTypes.ADD_INGREDIENT:
      return {
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
          isBuilding: true
        }
      };
    // Remove ingredient.
    case actionTypes.REMOVE_INGREDIENT:
      return {
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
          isBuilding: true
        }
      };
    // Reset ingredient.
    case actionTypes.SET_INGREDIENTS:
      return {
        ...state,
        ingredients: action.ingredients,
        totalPrice: 0,
        error: false,
        isBuilding: false
      };
    // Handle case when fetching ingredients from firebase is failed.
    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return {
        ...state,
        error: true
      };
    default:
      return state;
  }
};

export default reducer;
