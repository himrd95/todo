import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { register_reducer } from "./auth/reducer";
import { reducer } from "./app/reducer";

const rootReducer = combineReducers({
    auth: register_reducer,
    app: reducer
})
const logger = store => (next) => (action) => {
    return typeof action === "function"
    ? action(store.dispatch, store.getState)
    : next(action);
}

const composeEnhancers =
window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(logger)));
// console.log(store.getState())
  

export {store}