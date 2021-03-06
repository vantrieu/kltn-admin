import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { accountReducer } from "./Account/reducers";
import thunkMiddleware from "redux-thunk";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { setAuthToken } from '../helpers';
import { notifyReducer } from "./Notify/reducers";
import { trackTypesReducer } from "./TrackTypes/reducers";
import { trackReducer } from "./Tracks/reducers";
import { singerReducer } from "./Singers/reducers";
import { playlistReducer } from "./Playlist/reducers";
import { albumReducer } from "./Albums/reducers";
import { moderatorReducer } from "./Moderators/reducers";
import { userReducer } from "./Users/reducers";

const persistConfig = {
    key: 'root',
    storage,
    whitelist: [
      'account'
    ]
}

const rootReducer = combineReducers({
    account: accountReducer,
    notify: notifyReducer,
    tracktypes: trackTypesReducer,
    tracks: trackReducer,
    singers: singerReducer,
    playlists: playlistReducer,
    albums: albumReducer,
    moderators: moderatorReducer,
    users: userReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer)

declare global{
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

export type AppState = ReturnType<typeof rootReducer>;

const configureStore = () => {
    const middlewares = [thunkMiddleware];
    const middlewareEnhancer = applyMiddleware(...middlewares);

    return createStore(persistedReducer, composeEnhancers(middlewareEnhancer));
}

const store = configureStore();
const persistedStore = persistStore(store);

let currentState = store.getState() as AppState;

store.subscribe(() => {
  // keep track of the previous and current state to compare changes
  let previousState = currentState;
  currentState = store.getState() as AppState;
  // if the token changes set the value in localStorage and axios headers
  if (previousState.account.accessToken !== currentState.account.accessToken) {
    const token = currentState.account.accessToken;
    if (token) {
      setAuthToken(token);
    }
  }
});

export { store, persistedStore };