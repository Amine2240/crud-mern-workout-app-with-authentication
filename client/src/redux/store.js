import { configureStore } from "@reduxjs/toolkit";
import workoutReducer from "./workoutslice";

export const store = configureStore({
  reducer: {
    workoutid: workoutReducer,
  },
});
