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
  try {
    const todos = await pool.query("SELECT todo_id, description FROM todo");
    res.json(todos);
  } catch (error) {
    console.log(error.message);
  }
});

//get a todo
app.get("/todos/:id", async (req, res) => {
  try {
    const todo_id = req.params.id;
    const todo = await pool.query(
      "SELECT todo_id, description FROM todo WHERE todo_id=$1",
      [todo_id]
    );

    res.json(todo);
  } catch (error) {
    console.log(error.message);
  }
});

//edit a todo
app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    await pool.query(
      "UPDATE todo SET description = $1 WHERE todo_id = $2 RETURNING *",
      [description, id]
    );

    try {
      const arrangedTodos = await pool.query(
        "SELECT todo_id, description FROM todo ORDER BY todo_id ASC"
      );

      res.json(arrangedTodos.rows);
    } catch (error) {
      console.log(error.message);
    }
  } catch (error) {
    console.log(error.message);
  }
});

//delete a todo
app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const todo = await pool.query(
      "DELETE FROM todo WHERE todo_id = $1 RETURNING *",
      [id]
    );

    res.json({ message: `Todo "${todo.rows[0].description}" deleted` });
  } catch (error) {
    console.log(error.message);
  }
});

app.listen(5000, () => {
  console.log("Server has started on port 5000");
});
