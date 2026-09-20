import axios from "axios";

// All HTTP calls to the backend live here - components never call axios directly.
const API_URL = "http://localhost:5000/api/expenses";

export async function fetchExpenses() {
  const response = await axios.get(API_URL);
  return response.data;
}

export async function createExpense(expenseData) {
  const response = await axios.post(API_URL, expenseData);
  return response.data;
}

export async function updateExpense(id, expenseData) {
  const response = await axios.put(`${API_URL}/${id}`, expenseData);
  return response.data;
}

export async function deleteExpense(id) {
  await axios.delete(`${API_URL}/${id}`);
  return id;
}
