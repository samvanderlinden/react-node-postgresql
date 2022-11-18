require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const todoRouter = require("./routes/todoRoutes");

//MIDDLEWARE
app.use(cors());
app.use(express.json());

//ROUTES
app.use("/todos", todoRouter);

app.listen(5000, () => {
  console.log("Server has started on port 5000");
});
