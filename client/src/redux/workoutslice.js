import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "",
};

export const workoutSlice = createSlice({
  name: "workoutid",
  initialState,
  reducers: {
    setworkoutid: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setworkoutid } = workoutSlice.actions;

export default workoutSlice.reducer;
