const expenseService = require("../services/expense.service");

// Controller layer - reads the request, calls the service, sends the response.
// No business logic and no direct database calls here.

async function getAllExpenses(req, res, next) {
  try {
    const expenses = await expenseService.getAllExpenses();
    res.status(200).json(expenses);
  } catch (error) {
    next(error);
  }
}

async function getExpenseById(req, res, next) {
  try {
    const expense = await expenseService.getExpenseById(req.params.id);
    res.status(200).json(expense);
  } catch (error) {
    next(error);
  }
}

async function createExpense(req, res, next) {
  try {
    const expense = await expenseService.createExpense(req.body);
    res.status(201).json(expense);
  } catch (error) {
    next(error);
  }
}

async function updateExpense(req, res, next) {
  try {
    const expense = await expenseService.updateExpense(req.params.id, req.body);
    res.status(200).json(expense);
  } catch (error) {
    next(error);
  }
}

async function deleteExpense(req, res, next) {
  try {
    await expenseService.deleteExpense(req.params.id);
    res.status(200).json({ message: "Expense deleted successfully" });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAllExpenses,
  getExpenseById,
  createExpense,
  updateExpense,
  deleteExpense,
};
