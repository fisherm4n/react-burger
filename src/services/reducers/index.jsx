import { combineReducers } from "redux";
import { ingredientsReducer } from "./ingredients";
import modalOrderReducer from "./orderModal";
import { getUserInfo } from "./auth";
import { wsFeedsReducer } from "./wsFeeds";
export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    modalOrder: modalOrderReducer,
    user: getUserInfo,
    feed: wsFeedsReducer,
});
