import { rootReducer } from "./reducers/index";
import thunk from "redux-thunk";
import { compose, createStore, applyMiddleware } from "redux";
import { socketMiddleware } from "./middleware/socketMiddleware";
import { wsOrdersActions, wsUserActions } from "./actions/wsActionTypes";

const composeEnhancers =
    typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
        : compose;

const enhancer = composeEnhancers(
    applyMiddleware(
        thunk,
        socketMiddleware(wsOrdersActions),
        socketMiddleware(wsUserActions)
    )
);

export const store = createStore(rootReducer, enhancer);
