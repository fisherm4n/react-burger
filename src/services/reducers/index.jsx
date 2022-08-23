import { combineReducers } from "redux";
import { ingredientsReducer } from "./ingredients";
import modalIngredientReducer from "./ingredientModal";
import modalOrderReducer from "./orderModal";
import { getUserInfo } from "./auth";
export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  modal: modalIngredientReducer,
  modalOrder: modalOrderReducer,
  user: getUserInfo,
});
