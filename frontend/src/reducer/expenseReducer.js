// All state for the dashboard (data + UI filters) lives in one reducer,
// updated through dispatch(action) instead of scattered useState calls.

export const ACTIONS = {
  FETCH_INIT: "FETCH_INIT",
  FETCH_SUCCESS: "FETCH_SUCCESS",
  FETCH_ERROR: "FETCH_ERROR",
  ADD_EXPENSE: "ADD_EXPENSE",
  UPDATE_EXPENSE: "UPDATE_EXPENSE",
  DELETE_EXPENSE: "DELETE_EXPENSE",
  SET_CATEGORY_FILTER: "SET_CATEGORY_FILTER",
  SET_MONTH_FILTER: "SET_MONTH_FILTER",
  SET_SORT: "SET_SORT",
};

export const initialState = {
  expenses: [],
  loading: false,
  error: null,
  categoryFilter: "All",
  monthFilter: "All",
  sortBy: "none", // "none" | "amount" | "date"
  sortOrder: "asc", // "asc" | "desc"
};

export function expenseReducer(state, action) {
  switch (action.type) {
    case ACTIONS.FETCH_INIT:
      return { ...state, loading: true, error: null };

    case ACTIONS.FETCH_SUCCESS:
      return { ...state, loading: false, expenses: action.payload };

    case ACTIONS.FETCH_ERROR:
      return { ...state, loading: false, error: action.payload };

    case ACTIONS.ADD_EXPENSE:
      return { ...state, expenses: [action.payload, ...state.expenses] };

    case ACTIONS.UPDATE_EXPENSE:
      return {
        ...state,
        expenses: state.expenses.map((expense) =>
          expense._id === action.payload._id ? action.payload : expense
        ),
      };

    case ACTIONS.DELETE_EXPENSE:
      return {
        ...state,
        expenses: state.expenses.filter((expense) => expense._id !== action.payload),
      };

    case ACTIONS.SET_CATEGORY_FILTER:
      return { ...state, categoryFilter: action.payload };

    case ACTIONS.SET_MONTH_FILTER:
      return { ...state, monthFilter: action.payload };

    case ACTIONS.SET_SORT:
      return { ...state, sortBy: action.payload.sortBy, sortOrder: action.payload.sortOrder };

    default:
      return state;
  }
}
