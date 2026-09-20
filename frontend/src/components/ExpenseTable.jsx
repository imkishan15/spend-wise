import { useState } from "react";

// Displays transactions in a table with working Edit and Delete
// Edit/Delete are already implemented - students do NOT need to build these

function ExpenseTable({ transactions, onUpdate, onDelete }) {
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ title: "", amount: "", category: "" });

  function startEditing(transaction) {
    setEditingId(transaction.id);
    setEditForm({
      title: transaction.title,
      amount: transaction.amount,
      category: transaction.category,
    });
  }

  function cancelEditing() {
    setEditingId(null);
  }

  function saveEditing(id) {
    onUpdate(id, {
      title: editForm.title,
      amount: Number(editForm.amount),
      category: editForm.category,
    });
    setEditingId(null);
  }

  return (
    <table className="expense-table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Category</th>
          <th>Type</th>
          <th>Date</th>
          <th>Amount</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {transactions.length === 0 && (
          <tr>
            <td colSpan="6" className="empty-row">
              No transactions found
            </td>
          </tr>
        )}

        {transactions.map((transaction) => (
          <tr key={transaction.id}>
            {editingId === transaction.id ? (
              // Editing mode: show input fields
              <>
                <td>
                  <input
                    type="text"
                    value={editForm.title}
                    onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={editForm.category}
                    onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                  />
                </td>
                <td>{transaction.type}</td>
                <td>{transaction.date}</td>
                <td>
                  <input
                    type="number"
                    value={editForm.amount}
                    onChange={(e) => setEditForm({ ...editForm, amount: e.target.value })}
                  />
                </td>
                <td className="actions">
                  <button className="save-btn" onClick={() => saveEditing(transaction.id)}>
                    Save
                  </button>
                  <button className="cancel-btn" onClick={cancelEditing}>
                    Cancel
                  </button>
                </td>
              </>
            ) : (
              // Normal display mode
              <>
                <td>{transaction.title}</td>
                <td>{transaction.category}</td>
                <td>
                  <span className={`type-badge ${transaction.type}`}>{transaction.type}</span>
                </td>
                <td>{transaction.date}</td>
                <td>₹{transaction.amount.toLocaleString()}</td>
                <td className="actions">
                  <button className="edit-btn" onClick={() => startEditing(transaction)}>
                    Edit
                  </button>
                  <button className="delete-btn" onClick={() => onDelete(transaction.id)}>
                    Delete
                  </button>
                </td>
              </>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ExpenseTable;
