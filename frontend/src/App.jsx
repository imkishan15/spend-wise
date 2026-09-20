import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./components/Navbar.jsx";
import SummaryCards from "./components/SummaryCards.jsx";
import Filter from "./components/Filter.jsx";
import ExpenseTable from "./components/ExpenseTable.jsx";
import CategoryChart from "./components/CategoryChart.jsx";

const API_URL = "http://localhost:5000/api/expenses";

function App() {
  const [expenses, setExpenses] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Bonus: monthly filter and sorting state
  const [selectedMonth, setSelectedMonth] = useState("All");
  const [sortBy, setSortBy] = useState("none");
  const [sortOrder, setSortOrder] = useState("asc");

  // Fetch all expenses when the page loads
  useEffect(() => {
    axios.get(API_URL).then((response) => {
      setExpenses(response.data);
    });
  }, []);

  // Update a transaction (Edit button in the table)
  function handleUpdate(id, updatedFields) {
    axios.put(`${API_URL}/${id}`, updatedFields).then((response) => {
      setExpenses(
        expenses.map((expense) => (expense.id === id ? response.data : expense))
      );
    });
  }

  // Delete a transaction (Delete button in the table)
  function handleDelete(id) {
    axios.delete(`${API_URL}/${id}`).then(() => {
      setExpenses(expenses.filter((expense) => expense.id !== id));
    });
  }

  // ----- STEP 1: Filter by category -----
  let filteredExpenses = expenses.filter((expense) => {
    if (selectedCategory === "All") return true;
    return expense.category === selectedCategory;
  });

  // ----- Bonus: Filter by month -----
  filteredExpenses = filteredExpenses.filter((expense) => {
    if (selectedMonth === "All") return true;
    const expenseMonth = expense.date.slice(0, 7); // "YYYY-MM"
    return expenseMonth === selectedMonth;
  });

  // ----- Bonus: Sorting -----
  if (sortBy !== "none") {
    filteredExpenses = [...filteredExpenses].sort((a, b) => {
      let comparison = 0;
      if (sortBy === "amount") comparison = a.amount - b.amount;
      if (sortBy === "date") comparison = new Date(a.date) - new Date(b.date);
      return sortOrder === "asc" ? comparison : -comparison;
    });
  }

  // ----- STEP 2: Total Income -----
  const totalIncome = filteredExpenses
    .filter((expense) => expense.type === "income")
    .reduce((total, expense) => total + expense.amount, 0);

  // ----- STEP 3: Total Expense -----
  const totalExpense = filteredExpenses
    .filter((expense) => expense.type === "expense")
    .reduce((total, expense) => total + expense.amount, 0);

  // ----- STEP 4: Net Income -----
  const netIncome = totalIncome - totalExpense;

  // ----- STEP 5: Average Expense -----
  const expenseTransactions = filteredExpenses.filter((expense) => expense.type === "expense");
  const averageExpense =
    expenseTransactions.length > 0
      ? Math.round(totalExpense / expenseTransactions.length)
      : 0;

  // ----- STEP 6: Highest Expense -----
  const highestExpense =
    expenseTransactions.length > 0
      ? expenseTransactions.reduce((highest, expense) =>
          expense.amount > highest.amount ? expense : highest
        )
      : null;

  // Bonus: build a list of unique months (YYYY-MM) for the month filter dropdown
  const months = [...new Set(expenses.map((expense) => expense.date.slice(0, 7)))].sort();

  function handleSortChange(newSortBy, newSortOrder) {
    setSortBy(newSortBy);
    setSortOrder(newSortOrder);
  }

  return (
    <div className="app">
      <Navbar />

      <div className="container">
        <SummaryCards
          totalIncome={totalIncome}
          totalExpense={totalExpense}
          netIncome={netIncome}
          averageExpense={averageExpense}
          highestExpense={highestExpense}
        />

        <Filter
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          selectedMonth={selectedMonth}
          onMonthChange={setSelectedMonth}
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
