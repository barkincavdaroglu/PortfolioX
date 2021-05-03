import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import reducer from "./reducers/index";

const initialState = {};
const middleware = [thunk];

const store = createStore(
  reducer,
  applyMiddleware(...middleware)
);
export default store;