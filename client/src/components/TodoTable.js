import React, { useState } from "react";
import {
  deleteTodo,
  updateTodoCompletedStatus,
} from "../features/todo/todoSlice";
import { useSelector, useDispatch } from "react-redux";
import {
  Paper,
  TableContainer,
  TableHead,
  Table,
  TableRow,
  TableBody,
  TableCell,
  Grid,
  IconButton,
  Switch,
  TablePagination,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import EditDialog from "./EditDialog";

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

const TodoTable = ({ setTodos }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [open, setOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const { todos } = useSelector((state) => state.todo);
  const dispatch = useDispatch();
  console.log({ todos });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleClickOpen = (todo) => {
    setOpen(true);
    setSelectedTodo(todo);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onTodoIsCompletedChange = async (todo) => {
    dispatch(updateTodoCompletedStatus(todo));
  };

  const onDeleteTodo = async (todo) => {
    dispatch(deleteTodo(todo));
  };

  return (
    <>
      {todos.length === 0 ? (
        <p>Loading...</p>
      ) : (
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
                                    <IconButton
                                      onClick={() => handleClickOpen(todo)}
                                    >
                                      <EditIcon />
                                    </IconButton>
                                    <IconButton
                                      color="error"
                                      onClick={() => onDeleteTodo(todo.todo_id)}
                                    >
                                      <DeleteIcon />
                                    </IconButton>
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
          {open && (
            <EditDialog
              handleClose={handleClose}
              open={open}
              setOpen={setOpen}
              setTodos={setTodos}
              todo={selectedTodo}
            />
          )}
        </Paper>
      )}
    </>
  );
};

export default TodoTable;
