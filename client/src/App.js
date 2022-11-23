import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

const columns = [
  {
    id: "description",
    label: "Description",
    format: (value) => value.charAt(0).toUpperCase() + value.slice(1),
    minWidth: 170,
  },
  {
    id: "completed",
    label: "Is Completed",
    format: (value) =>
      value.toString().charAt(0).toUpperCase() + value.toString().slice(1),
    minWidth: 100,
  },
];

function App() {
  const [todoInput, setTodoInput] = useState("");
  const [todos, setTodos] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const onTodoInputChange = (e) => {
    setTodoInput(e.target.value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log({ todoInput });
    setTodoInput("");
  };

  useEffect(() => {
    const getTodosData = async () => {
      const response = await axios.get("http://localhost:5000/todos");
      const todosData = response.data;

      setTodos(todosData);
    };

    getTodosData();
  }, []);

  return (
    <div className="App">
      <h1>My ToDo App</h1>
      <form onSubmit={onSubmitHandler}>
        <FormControl>
          <InputLabel htmlFor="todo-input">ToDo Input</InputLabel>
          <Input
            id="todo-input"
            value={todoInput}
            onChange={onTodoInputChange}
          />
        </FormControl>
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </form>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {todos
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((todo) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={todo.todo_id}
                    >
                      {columns.map((column) => {
                        const value = todo[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format(value)}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={todos.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}

export default App;
