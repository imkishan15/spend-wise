import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./components/Navbar.jsx";
import SummaryCards from "./components/SummaryCards.jsx";
import Filter from "./components/Filter.jsx";
import ExpenseTable from "./components/ExpenseTable.jsx";

const API_URL = "http://localhost:5000/api/expenses";

function App() {
  const [expenses, setExpenses] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Fetch all expenses when the page loads
  useEffect(() => {
    axios.get(API_URL).then((response) => {
      setExpenses(response.data);
    });
  }, []);

  // Update a transaction (Edit button in the table) - already implemented
  function handleUpdate(id, updatedFields) {
    axios.put(`${API_URL}/${id}`, updatedFields).then((response) => {
      setExpenses(
        expenses.map((expense) => (expense.id === id ? response.data : expense))
      );
    });
  }

  // Delete a transaction (Delete button in the table) - already implemented
  function handleDelete(id) {
    axios.delete(`${API_URL}/${id}`).then(() => {
      setExpenses(expenses.filter((expense) => expense.id !== id));
    });
  }

  // ====================================================================
  // TODO 1 (Category Filter): Filter `expenses` by `selectedCategory`.
  // - If selectedCategory is "All", keep every transaction.
  // - Otherwise, keep only transactions whose category matches.
  // - Use array.filter()
  // This `filteredExpenses` array should then be used below for the
  // table AND for all the KPI calculations, so the filter updates
  // everything on the page.
  // ====================================================================
  const filteredExpenses = expenses; // <-- replace this line

  // ====================================================================
  // TODO 2 (Total Income): Sum the amount of every transaction in
  // `filteredExpenses` where type === "income".
  // Use .filter() then .reduce()
  // ====================================================================
  const totalIncome = 0; // <-- replace this line

  // ====================================================================
  // TODO 3 (Total Expense): Sum the amount of every transaction in
  // `filteredExpenses` where type === "expense".
  // Use .filter() then .reduce()
  // ====================================================================
  const totalExpense = 0; // <-- replace this line

  // ====================================================================
  // TODO 4 (Net Income): totalIncome - totalExpense
  // ====================================================================
  const netIncome = 0; // <-- replace this line

  // ====================================================================
  // TODO 5 (Average Expense): Average amount of all expense transactions
  // in `filteredExpenses`. Watch out for dividing by zero if there are
  // no expense transactions!
  // ====================================================================
  const averageExpense = 0; // <-- replace this line

  // ====================================================================
  // TODO 6 (Highest Expense): Find the expense transaction (type ===
  // "expense") with the largest amount in `filteredExpenses`.
  // Use .reduce() or .find() with a sorted copy of the array.
  // Should be `null` if there are no expense transactions.
  // ====================================================================
  const highestExpense = null; // <-- replace this line

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

        <Filter selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory} />

        <ExpenseTable
          transactions={filteredExpenses}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}

export default App;
