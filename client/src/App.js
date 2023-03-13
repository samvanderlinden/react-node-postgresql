import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import Paper from "@mui/material/Paper";
import Switch from "@mui/material/Switch";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Grid } from "@mui/material";
import TodoForm from "./components/TodoForm";

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

  const onTodoIsCompletedChange = async (todo) => {
    const { completed, todo_id, description } = todo;

    try {
      const updatedRows = await axios.put(
        `http://localhost:5000/todos/completeTodo/${todo_id}`,
        { description: description, isComplete: completed }
      );

      setTodos(updatedRows.data);
    } catch (error) {
      console.log(error);
    }
  };

  const onDeleteTodo = async (todo) => {
    await axios.delete(`http://localhost:5000/todos/${todo}`);
    getTodosData();
  };

  const getTodosData = async () => {
    const response = await axios.get("http://localhost:5000/todos");
    const todosData = response.data;

    setTodos(todosData);
  };

  useEffect(() => {
    getTodosData();
  }, []);

  return (
    <div className="App">
      <header>
        <h1>My ToDo App</h1>
      </header>
      <TodoForm getTodosData={getTodosData} />
      <Paper elevation={3} sx={{ m: 5 }}>
        <TableContainer sx={{ maxHeight: 500 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead
              sx={{
                backgroundColor: "yellow",
              }}
            >
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
                    <TableRow hover={true} tabIndex={-1} key={todo.todo_id}>
                      {columns.map((column) => {
                        const value = todo[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.id === "description" ? (
                              <Grid
                                container
                                direction="row"
                                justifyContent="space-between"
                                alignItems="center"
                              >
                                <Grid item>{column.format(value)}</Grid>
                                <Grid item>
                                  <Button
                                    variant="contained"
                                    color="error"
                                    size="small"
                                    startIcon={<DeleteIcon />}
                                    onClick={() => onDeleteTodo(todo.todo_id)}
                                  >
                                    Delete
                                  </Button>
                                </Grid>
                              </Grid>
                            ) : (
                              <Switch
                                checked={todo.completed}
                                inputProps={{ "aria-label": "controlled" }}
                                onClick={() => onTodoIsCompletedChange(todo)}
                              />
                            )}
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
