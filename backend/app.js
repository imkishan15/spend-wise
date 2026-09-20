const express = require("express");
const cors = require("cors");
const expenseRoutes = require("./routes/expense.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/expenses", expenseRoutes);

// Unknown route
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Central error handler - every controller forwards errors here via next(error)
app.use((err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Something went wrong";

  // Invalid MongoDB ObjectId (e.g. /api/expenses/not-a-real-id)
  if (err.name === "CastError") {
    statusCode = 400;
    message = "Invalid expense id";
  }

  // Mongoose schema validation failure
  if (err.name === "ValidationError") {
    statusCode = 400;
    message = Object.values(err.errors)
      .map((fieldError) => fieldError.message)
      .join(", ");
  }

  res.status(statusCode).json({ message });
});

module.exports = app;
