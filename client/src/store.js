import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { todosReducer } from "./features/todo/todoSlice";

const rootReducer = combineReducers({
  todo: todosReducer,
});

export const setupStore = (preloadedState) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};
