import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllTodos = createAsyncThunk(
  "todos/fetchAllTodos",
  async (thunkAPI) => {
    const response = await axios.get("http://localhost:5000/todos");
    return response.data;
  }
);

export const createTodo = createAsyncThunk(
  "todos/createTodo",
  async (todoDescription) => {
    const response = await axios.post("http://localhost:5000/todos", {
      description: todoDescription,
    });
    console.log({ response });
    return response.data;
  }
);

export const deleteTodo = createAsyncThunk(
  "todos/deleteTodo",
  async (todoId) => {
    const response = await axios.delete(
      `http://localhost:5000/todos/${todoId}`
    );
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
  extraReducers: {
    [fetchAllTodos.pending]: (state) => {
      state.loading = true;
    },
    [fetchAllTodos.fulfilled]: (state, { payload }) => {
      state.todos = payload;
      state.loading = false;
    },
    [fetchAllTodos.rejected]: (state) => {
      state.loading = false;
    },
    [createTodo.pending]: (state) => {
      state.loading = true;
    },
    [createTodo.fulfilled]: (state, { payload }) => {
      state.todos = payload;
      state.loading = false;
    },
    [createTodo.rejected]: (state) => {
      state.loading = false;
    },
    [deleteTodo.pending]: (state) => {
      state.loading = true;
    },
    [deleteTodo.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.todos = payload;
    },
    [deleteTodo.rejected]: (state) => {
      state.loading = false;
    },
  },
});

export const todosReducer = todoSlice.reducer;
