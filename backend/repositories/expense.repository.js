const Expense = require("../models/expense.model");

// Repository layer - the ONLY place that talks to Mongoose/MongoDB directly.
// Services call these functions instead of using the Expense model themselves.

async function findAll() {
  return Expense.find().sort({ date: -1 });
}

async function findById(id) {
  return Expense.findById(id);
}

async function create(expenseData) {
  return Expense.create(expenseData);
}

async function updateById(id, expenseData) {
  return Expense.findByIdAndUpdate(id, expenseData, {
    new: true, // return the updated document, not the old one
    runValidators: true, // re-run schema validation on update
  });
}

async function deleteById(id) {
  return Expense.findByIdAndDelete(id);
}

module.exports = {
  findAll,
  findById,
  create,
  updateById,
  deleteById,
};
