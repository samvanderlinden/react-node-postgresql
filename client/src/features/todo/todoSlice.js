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

export const updateTodoCompletedStatus = createAsyncThunk(
  "todos/updateCompletedStatus",
  async (todo) => {
    const { completed, todo_id, description } = todo;
    const response = await axios.put(
      `http://localhost:5000/todos/completeTodo/${todo_id}`,
      {
        description: description,
        isComplete: completed,
      }
    );
    return response.data;
  }
);

export const updateTodoDescription = createAsyncThunk(
  "todos/updateTodoDescription",
  async ({ todo, todoInput }) => {
    const response = await axios.put(
      `http://localhost:5000/todos/${todo.todo_id}`,
      {
        description: todoInput,
        isComplete: todo.completed,
      }
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
      state.todos.push(payload);
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

      // First, find index of element that contains the same todo_id from payload todo_id
      const index = state.todos.findIndex(
        (todo) => todo.todo_id === payload.todo_id
      );

      // If item exists in array, then remove using mutable splice method
      if (index > -1) {
        state.todos.splice(index, 1);
      }
    },
    [deleteTodo.rejected]: (state) => {
      state.loading = false;
    },
    [updateTodoCompletedStatus.pending]: (state) => {
      state.loading = true;
    },
    [updateTodoCompletedStatus.fulfilled]: (state, { payload }) => {
      state.loading = false;
      for (let index = 0; index < state.todos.length; index++) {
        if (state.todos[index].todo_id === payload.todo_id) {
          state.todos[index] = payload;
        }
      }
    },
    [updateTodoCompletedStatus.rejected]: (state) => {
      state.loading = false;
    },
    [updateTodoDescription.pending]: (state) => {
      state.loading = true;
    },
    [updateTodoDescription.fulfilled]: (state, { payload }) => {
      state.loading = false;
      for (let index = 0; index < state.todos.length; index++) {
        if (state.todos[index].todo_id === payload.todo_id) {
          state.todos[index] = payload;
        }
      }
    },
    [updateTodoDescription.rejected]: (state) => {
      state.loading = false;
    },
  },
});

export const todosReducer = todoSlice.reducer;
