import React, { useState } from "react";
import axios from "axios";
import {
  Paper,
  TableContainer,
  TableHead,
  Table,
  TableRow,
  TableBody,
  TableCell,
  Grid,
  Switch,
  Button,
  TablePagination,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

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

const TodoTable = ({ todos, setTodos }) => {
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
    const todos = await axios.delete(`http://localhost:5000/todos/${todo}`);
    setTodos(todos.data);
  };

  return (
    <>
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
    </>
  );
};

export default TodoTable;