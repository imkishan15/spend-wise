# Expense Dashboard

A simple full-stack Expense Dashboard built for a 3rd-semester college evaluation.
Students practice React state/props, `useEffect`, array methods (`filter`, `reduce`, `find`), and consuming a REST API.

## 1. Project Overview

The app shows a list of income/expense transactions fetched from a small Express API (backed by a local JSON file, no database). The dashboard displays 5 summary cards (Total Income, Total Expense, Net Income, Average Expense, Highest Expense), a category filter, and a transaction table with working Edit/Delete.

## 2. Technologies Used

**Frontend:** React, Vite, JavaScript, plain CSS, Axios
**Backend:** Node.js, Express.js
**Data:** Local JSON file (`backend/data/expenses.json`) — no MongoDB, no auth, no Redux

## 3. Install Dependencies

Open two terminals (one for backend, one for frontend).

```bash
# Backend
cd backend
npm install

# Frontend
cd frontend
npm install
```

## 4. Start the Backend

```bash
cd backend
npm start
```

Backend runs at: `http://localhost:5000`

## 5. Start the Frontend

```bash
cd frontend
npm run dev
```

Frontend runs at: `http://localhost:5173`

Make sure the backend is running first, so the dashboard can fetch data.

## 6. API Endpoints

| Method | Endpoint             | Description                |
|--------|-----------------------|----------------------------|
| GET    | `/api/expenses`       | Get all transactions       |
| PUT    | `/api/expenses/:id`   | Update a transaction       |
| DELETE | `/api/expenses/:id`   | Delete a transaction       |

Edit and Delete are already fully implemented in the starter project — students do not need to build these.

## 7. Student Evaluation Requirements (Mandatory)

Implement the following inside `frontend/src/App.jsx` (and `SummaryCards.jsx` / `Filter.jsx` where noted):

1. **Total Income** — sum of all transactions where `type === "income"`
2. **Total Expense** — sum of all transactions where `type === "expense"`
3. **Net Income** — `Total Income - Total Expense`
4. **Average Expense** — average amount of all expense transactions
5. **Highest Expense** — the single transaction with the largest expense amount
6. **Category Filter** — filter the transaction table (and the 5 KPIs above) by category

Look for the `// TODO` comments in the code — that's exactly where each piece belongs.

## 8. Bonus Requirements (Optional)

If you finish early:

1. **Monthly Filter** — filter transactions by month
2. **Sorting** — sort transactions by Amount or Date, ascending/descending
3. **Expense Chart** — a simple category-wise expense chart (plain CSS bars are fine, no library required)

## Project Structure

```
spend-wise/
├── backend/
│   ├── data/
│   │   └── expenses.json
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── SummaryCards.jsx
│   │   │   ├── ExpenseTable.jsx
│   │   │   └── Filter.jsx
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   ├── index.html
│   └── package.json
└── README.md
```
