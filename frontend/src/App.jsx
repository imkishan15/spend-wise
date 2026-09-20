import { useReducer, useEffect } from "react";
import Navbar from "./components/Navbar.jsx";
import SummaryCards from "./components/SummaryCards.jsx";
import Filter from "./components/Filter.jsx";
import ExpenseTable from "./components/ExpenseTable.jsx";
import CategoryChart from "./components/CategoryChart.jsx";
import AddExpenseForm from "./components/AddExpenseForm.jsx";
import { expenseReducer, initialState, ACTIONS } from "./reducer/expenseReducer.js";
import * as expenseApi from "./api/expenseApi.js";

function App() {
  const [state, dispatch] = useReducer(expenseReducer, initialState);
  const { expenses, loading, error, categoryFilter, monthFilter, sortBy, sortOrder } = state;

  // Fetch all expenses when the page loads
  useEffect(() => {
    dispatch({ type: ACTIONS.FETCH_INIT });
    expenseApi
      .fetchExpenses()
      .then((data) => dispatch({ type: ACTIONS.FETCH_SUCCESS, payload: data }))
      .catch((err) => dispatch({ type: ACTIONS.FETCH_ERROR, payload: err.message }));
  }, []);

  function handleAdd(newExpense) {
    expenseApi.createExpense(newExpense).then((created) => {
      dispatch({ type: ACTIONS.ADD_EXPENSE, payload: created });
    });
  }

  function handleUpdate(id, updatedFields) {
    expenseApi.updateExpense(id, updatedFields).then((updated) => {
      dispatch({ type: ACTIONS.UPDATE_EXPENSE, payload: updated });
    });
  }

  function handleDelete(id) {
    expenseApi.deleteExpense(id).then(() => {
      dispatch({ type: ACTIONS.DELETE_EXPENSE, payload: id });
    });
  }

  function handleSortChange(newSortBy, newSortOrder) {
    dispatch({ type: ACTIONS.SET_SORT, payload: { sortBy: newSortBy, sortOrder: newSortOrder } });
  }

  // ----- Filter by category -----
  let filteredExpenses = expenses.filter((expense) => {
    if (categoryFilter === "All") return true;
    return expense.category === categoryFilter;
  });

  // ----- Filter by month -----
  filteredExpenses = filteredExpenses.filter((expense) => {
    if (monthFilter === "All") return true;
    const expenseMonth = expense.date.slice(0, 7); // "YYYY-MM"
    return expenseMonth === monthFilter;
  });

  // ----- Sorting -----
  if (sortBy !== "none") {
    filteredExpenses = [...filteredExpenses].sort((a, b) => {
      let comparison = 0;
      if (sortBy === "amount") comparison = a.amount - b.amount;
      if (sortBy === "date") comparison = new Date(a.date) - new Date(b.date);
      return sortOrder === "asc" ? comparison : -comparison;
    });
  }

  // ----- Total Income -----
  const totalIncome = filteredExpenses
    .filter((expense) => expense.type === "income")
    .reduce((total, expense) => total + expense.amount, 0);

  // ----- Total Expense -----
  const totalExpense = filteredExpenses
    .filter((expense) => expense.type === "expense")
    .reduce((total, expense) => total + expense.amount, 0);

  // ----- Net Income -----
  const netIncome = totalIncome - totalExpense;

  // ----- Average Expense -----
  const expenseTransactions = filteredExpenses.filter((expense) => expense.type === "expense");
  const averageExpense =
    expenseTransactions.length > 0 ? Math.round(totalExpense / expenseTransactions.length) : 0;

  // ----- Highest Expense -----
  const highestExpense =
    expenseTransactions.length > 0
      ? expenseTransactions.reduce((highest, expense) =>
          expense.amount > highest.amount ? expense : highest
        )
      : null;

  // Unique months (YYYY-MM) for the month filter dropdown
  const months = [...new Set(expenses.map((expense) => expense.date.slice(0, 7)))].sort();

  return (
    <div className="app">
      <Navbar />

      <div className="container">
        {error && <p className="error-banner">Failed to load expenses: {error}</p>}
        {loading && <p className="loading-banner">Loading...</p>}

        <SummaryCards
          totalIncome={totalIncome}
          totalExpense={totalExpense}
          netIncome={netIncome}
          averageExpense={averageExpense}
          highestExpense={highestExpense}
        />

        <AddExpenseForm onAdd={handleAdd} />

        <Filter
          selectedCategory={categoryFilter}
          onCategoryChange={(value) => dispatch({ type: ACTIONS.SET_CATEGORY_FILTER, payload: value })}
          selectedMonth={monthFilter}
          onMonthChange={(value) => dispatch({ type: ACTIONS.SET_MONTH_FILTER, payload: value })}
          months={months}
          sortBy={sortBy}
          sortOrder={sortOrder}
          onSortChange={handleSortChange}
        />

        <ExpenseTable
          transactions={filteredExpenses}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />

        <CategoryChart transactions={filteredExpenses} />
      </div>
    </div>
  );
}

export default App;
