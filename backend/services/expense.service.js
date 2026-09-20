const expenseRepository = require("../repositories/expense.repository");

// Service layer - business logic lives here. Controllers call these
// functions instead of talking to the repository directly.

function notFoundError() {
  const error = new Error("Expense not found");
  error.statusCode = 404;
  return error;
}

async function getAllExpenses() {
  return expenseRepository.findAll();
}

async function getExpenseById(id) {
  const expense = await expenseRepository.findById(id);
  if (!expense) throw notFoundError();
  return expense;
}

async function createExpense(expenseData) {
  return expenseRepository.create(expenseData);
}

async function updateExpense(id, expenseData) {
  const updatedExpense = await expenseRepository.updateById(id, expenseData);
  if (!updatedExpense) throw notFoundError();
  return updatedExpense;
}

async function deleteExpense(id) {
  const deletedExpense = await expenseRepository.deleteById(id);
  if (!deletedExpense) throw notFoundError();
  return deletedExpense;
}

module.exports = {
  getAllExpenses,
  getExpenseById,
  createExpense,
  updateExpense,
  deleteExpense,
};
