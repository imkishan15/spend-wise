// Simple Express server for Expense Dashboard
// Reads/writes transactions from a local JSON file (no database needed)

const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 5000;

const DATA_FILE = path.join(__dirname, "data", "expenses.json");

app.use(cors());
app.use(express.json());

// Helper: read all expenses from the JSON file
function readExpenses() {
  const rawData = fs.readFileSync(DATA_FILE, "utf-8");
  return JSON.parse(rawData);
}

// Helper: save all expenses back to the JSON file
function writeExpenses(expenses) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(expenses, null, 2));
}

// GET /api/expenses -> return all transactions
app.get("/api/expenses", (req, res) => {
  const expenses = readExpenses();
  res.json(expenses);
});

// PUT /api/expenses/:id -> update an existing transaction
app.put("/api/expenses/:id", (req, res) => {
  const expenses = readExpenses();
  const id = Number(req.params.id);

  const index = expenses.findIndex((expense) => expense.id === id);
  if (index === -1) {
    return res.status(404).json({ message: "Transaction not found" });
  }

  // Merge existing transaction with the updated fields
  expenses[index] = { ...expenses[index], ...req.body, id };
  writeExpenses(expenses);

  res.json(expenses[index]);
});

// DELETE /api/expenses/:id -> delete a transaction
app.delete("/api/expenses/:id", (req, res) => {
  const expenses = readExpenses();
  const id = Number(req.params.id);

  const index = expenses.findIndex((expense) => expense.id === id);
  if (index === -1) {
    return res.status(404).json({ message: "Transaction not found" });
  }

  const deletedExpense = expenses[index];
  expenses.splice(index, 1);
  writeExpenses(expenses);

  res.json(deletedExpense);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
