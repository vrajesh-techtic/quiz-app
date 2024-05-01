import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { quizReducers } from "./quizReducers";
import { adminReducers } from "./adminReducers";

const rootReducer = combineReducers({
  adminReducers,
  quizReducers,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
