import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllTodos = createAsyncThunk(
  "todos/fetchAllTodos",
  async () => {
    const response = await axios.get("http://localhost:5000/todos");
    return response.data;
  }
);

const initialState = [];

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    add: (state) => {
      state.value += 1;

      console.log({ state });
    },
    extraReducers: (builder) => {
      builder.addCase(fetchAllTodos.fulfilled, (state, action) => {
        console.log({ state });
        console.log({ action });
        // state.entities.push(action.payload);
      });
    },
  },
});

export const { add } = todoSlice.actions;

export default todoSlice.reducer;
