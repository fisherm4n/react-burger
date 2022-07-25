import { combineReducers } from "redux";
import { ingredientsReducer } from "./ingredients";
import modalIngredientReducer from "./ingredientModal";
import modalOrderReducer from "./orderModal";
export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  modal: modalIngredientReducer,
  modalOrder: modalOrderReducer,
});
