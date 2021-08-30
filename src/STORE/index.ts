import { createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage";

import allReducers from "./reducers";

// declare const window: any;

const persistConfig = {
  key: "vurtos",
  storage,
  timeout: undefined,
  whitelist: ["userInfo"],
  // blacklist: [
  //   'isLoggedIn'
  // ],
};

const persistedReducer = persistReducer(persistConfig, allReducers);

export const STORE = createStore(
  persistedReducer,
  // compose(
  applyMiddleware(thunk),
  //   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  // )
);

export const PERSISTOR = persistStore(STORE);
