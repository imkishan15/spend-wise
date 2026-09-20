const express = require("express");
const expenseController = require("../controllers/expense.controller");

const router = express.Router();

// Route layer - maps HTTP method + path to a controller function
router.get("/", expenseController.getAllExpenses);
router.get("/:id", expenseController.getExpenseById);
router.post("/", expenseController.createExpense);
router.put("/:id", expenseController.updateExpense);
router.delete("/:id", expenseController.deleteExpense);

module.exports = router;
