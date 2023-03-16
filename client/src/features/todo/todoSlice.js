import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllTodos = createAsyncThunk(
  "todos/fetchAllTodos",
  async (thunkAPI) => {
    const response = await axios.get("http://localhost:5000/todos");
    console.log({ response });
    return response.data;
  }
);

const initialState = {
  loading: false,
  todos: [],
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {},
  // extraReducers: (builder) => {
  //   builder.addCase(fetchAllTodos.fulfilled, (state, action) => {
  //     state = action.payload;
  //     console.log(state);
  //   });
  // },
  extraReducers: {
    [fetchAllTodos.pending]: (state) => {
      state.loading = true;
    },
    [fetchAllTodos.fulfilled]: (state, { payload }) => {
      state.todos = payload;
      console.log(payload);
    },
    [fetchAllTodos.rejected]: (state) => {
      state.loading = false;
    },
  },
});

export const todosReducer = todoSlice.reducer;
