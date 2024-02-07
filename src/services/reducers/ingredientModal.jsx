import {
  OPEN_MODAL_INGREDIENT,
  CLOSE_MODAL_INGREDIENT,
} from "../actions/ingredients";
const initialState = {
  ingredient: null,
};
const modalIngredientReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_MODAL_INGREDIENT:
      return {
        ...state,
        ingredient: action.payload,
      };
    case CLOSE_MODAL_INGREDIENT:
      return {
        ...state,
        ingredient: null,
      };
    default:
      return state;
  }
};
export default modalIngredientReducer;
