# Expense Dashboard (MongoDB + Layered Backend + Reducer Frontend)

Full-stack Expense Dashboard, rebuilt on a proper layered backend (route → controller → service → repository → Mongoose/MongoDB) with a `useReducer`-driven frontend. This is the complete, production-shaped version — see the `main` branch for the simple JSON-file version and the `evaluation` branch for the trimmed-down student version.

## 1. Project Overview

Income/expense transactions are stored in MongoDB and served through a REST API with full CRUD (Create, Read, Update, Delete). The dashboard shows 5 summary cards (Total Income, Total Expense, Net Income, Average Expense, Highest Expense), a category + month filter, sorting, a category-wise chart, an "Add Transaction" form, and a table with working Edit/Delete — all state managed through a single `useReducer` instead of scattered `useState` calls.

## 2. Technologies Used

**Frontend:** React, Vite, JavaScript, plain CSS, Axios, `useReducer`
**Backend:** Node.js, Express.js, Mongoose (ODM)
**Data:** MongoDB — no JSON file, no auth, no Redux

## 3. Backend Architecture

```
backend/
├── config/db.js                    # Mongoose connection
├── models/expense.model.js         # Mongoose schema
├── repositories/expense.repository.js   # Only layer that touches Mongoose/DB
├── services/expense.service.js     # Business logic, calls repository
├── controllers/expense.controller.js    # req/res handling, calls service
├── routes/expense.routes.js        # Maps HTTP verb + path -> controller
├── seed/expenses.seed.json         # 30 sample transactions
├── seed.js                         # Wipes and reseeds the database
├── app.js                          # Express app, middleware, error handler
└── server.js                       # Connects DB, then starts listening
```

Each layer only calls the one below it: **route → controller → service → repository → Mongoose model**.

## 4. Install Dependencies

```bash
# Backend
cd backend
npm install

# Frontend
cd frontend
npm install
```

## 5. Set Up MongoDB

You need a running MongoDB instance (local install, or a free MongoDB Atlas cluster).

```bash
cd backend
cp .env.example .env
# edit .env if your Mongo URI is not the local default
```

`.env.example`:
```
MONGO_URI=mongodb://127.0.0.1:27017/expense-dashboard
PORT=5000
```

Seed the database with 30 sample transactions:

```bash
cd backend
npm run seed
```

## 6. Start the Backend

```bash
cd backend
npm start
# or: npm run dev   (auto-restarts on file changes)
```

Backend runs at: `http://localhost:5000`

## 7. Start the Frontend

```bash
cd frontend
npm run dev
```

Frontend runs at: `http://localhost:5173`

## 8. API Endpoints

| Method | Endpoint             | Description                    |
|--------|-----------------------|---------------------------------|
| GET    | `/api/expenses`       | Get all transactions           |
| GET    | `/api/expenses/:id`   | Get one transaction by id      |
| POST   | `/api/expenses`       | Create a new transaction       |
| PUT    | `/api/expenses/:id`   | Update a transaction           |
| DELETE | `/api/expenses/:id`   | Delete a transaction           |

Invalid ids return `400`, missing transactions return `404`, schema validation failures (bad `category`/`type`) return `400` with a message.

## 9. Frontend State Management

All dashboard state (transactions, loading/error, category filter, month filter, sort) lives in one `useReducer` in `App.jsx`:

- `frontend/src/reducer/expenseReducer.js` — action types, initial state, reducer function
- `frontend/src/api/expenseApi.js` — the only place that calls axios
- `App.jsx` dispatches actions (`FETCH_SUCCESS`, `ADD_EXPENSE`, `UPDATE_EXPENSE`, `DELETE_EXPENSE`, `SET_CATEGORY_FILTER`, `SET_MONTH_FILTER`, `SET_SORT`) instead of calling multiple `setState` functions.

## 10. Features (all implemented)

- Total Income, Total Expense, Net Income, Average Expense, Highest Expense
- Category filter + month filter (both update the table and the KPI cards)
- Sort by Amount or Date, ascending/descending
- Category-wise expense chart (plain CSS bars)
- Add Transaction form (POST)
- Edit and Delete (PUT/DELETE)

## Project Structure

```
spend-wise/
├── backend/
│   ├── config/db.js
│   ├── models/expense.model.js
│   ├── repositories/expense.repository.js
│   ├── services/expense.service.js
│   ├── controllers/expense.controller.js
│   ├── routes/expense.routes.js
│   ├── seed/expenses.seed.json
│   ├── seed.js
│   ├── app.js
│   ├── server.js
│   ├── .env.example
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── api/expenseApi.js
│   │   ├── reducer/expenseReducer.js
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── SummaryCards.jsx
│   │   │   ├── ExpenseTable.jsx
│   │   │   ├── Filter.jsx
│   │   │   ├── CategoryChart.jsx
│   │   │   └── AddExpenseForm.jsx
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   ├── index.html
│   └── package.json
└── README.md
```
