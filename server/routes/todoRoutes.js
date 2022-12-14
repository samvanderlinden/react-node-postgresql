const express = require("express");
const router = express.Router();
const pool = require("../db");

// Get all todos
router.get("/", async (req, res) => {
  console.log("in todos router");
  try {
    const todos = await pool.query("SELECT todo_id, description FROM todo");
    res.json(todos.rows);
  } catch (error) {
    console.log(error.message);
  }
});

//Get a todo by id
router.get("/:id", async (req, res) => {
  try {
    const todo_id = req.params.id;
    const todo = await pool.query(
      "SELECT todo_id, description FROM todo WHERE todo_id=$1",
      [todo_id]
    );

    res.json(todo.rows[0]);
  } catch (error) {
    console.log(error.message);
  }
});

//Create a todo
router.post("/", async (req, res) => {
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

//Edit a todo
router.put("/:id", async (req, res) => {
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

//Delete a todo
router.delete("/:id", async (req, res) => {
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

module.exports = router;
