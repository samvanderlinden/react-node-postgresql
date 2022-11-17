require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//MIDDLEWARE
app.use(cors());
app.use(express.json());

//ROUTES
//create a todo
app.post("/todos", async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo (description) VALUES($1) RETURNING *",
      [description]
    );

    res.json(newTodo.rows[0]);
  } catch (error) {
    console.log(error.message);
  }
});

//get all todo
app.get("/todos", async (req, res) => {
  console.log("hello");
  try {
    const todos = await pool.query("SELECT todo_id, description FROM todo");
    res.json(todos);
  } catch (error) {
    console.log(error.message);
  }
});

//get a todo
app.get("/todos/:id", async (req, res) => {
  const todo_id = req.params.id;
  const todo = await pool.query(
    "SELECT todo_id, description FROM todo WHERE todo_id=$1",
    [todo_id]
  );

  res.json(todo);
});

//edit a todo

//delete a todo

app.listen(5000, () => {
  console.log("Server has started on port 5000");
});
