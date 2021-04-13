import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { accountReducer } from "./Account/reducers";
import thunkMiddleware from "redux-thunk";

const rootReducer = combineReducers({
    account: accountReducer
});

declare global{
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

export type AppState = ReturnType<typeof rootReducer>;

export default function configureStore() {
    const middlewares = [thunkMiddleware];
    const middlewareEnhancer = applyMiddleware(...middlewares);

    return createStore(rootReducer, composeEnhancers( middlewareEnhancer));
}