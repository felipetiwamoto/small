import { createStore, combineReducers } from "redux";
import todos from "./reducer/todos";

const reducers = combineReducers({ todos });
const store = createStore(reducers);

export default store;
