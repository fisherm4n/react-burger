import { combineReducers } from "redux";
import { ingredientsReducer } from "./ingredients";
import modalReducer from "./popup";
export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  modal: modalReducer,
});
