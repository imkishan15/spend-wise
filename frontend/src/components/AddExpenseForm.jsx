import { useState } from "react";

const CATEGORIES = ["Food", "Travel", "Shopping", "Bills", "Entertainment", "Salary", "Other"];

const EMPTY_FORM = {
  title: "",
  amount: "",
  category: "Food",
  type: "expense",
  date: "",
};

function AddExpenseForm({ onAdd }) {
  const [form, setForm] = useState(EMPTY_FORM);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.title || !form.amount || !form.date) return;

    onAdd({
      title: form.title,
      amount: Number(form.amount),
      category: form.category,
      type: form.type,
      date: form.date,
    });

    setForm(EMPTY_FORM);
  }

  return (
    <form className="add-expense-form" onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={handleChange}
        required
      />

      <input
        type="number"
        name="amount"
        placeholder="Amount"
        value={form.amount}
        onChange={handleChange}
        min="0"
        required
      />

      <select name="category" value={form.category} onChange={handleChange}>
        {CATEGORIES.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      <select name="type" value={form.type} onChange={handleChange}>
        <option value="expense">Expense</option>
        <option value="income">Income</option>
      </select>

      <input type="date" name="date" value={form.date} onChange={handleChange} required />

      <button type="submit">Add Transaction</button>
    </form>
  );
}

export default AddExpenseForm;
