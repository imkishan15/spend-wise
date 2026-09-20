// Displays the 5 dashboard KPI cards
// All values are calculated in App.jsx and passed down as props

function SummaryCards({ totalIncome, totalExpense, netIncome, averageExpense, highestExpense }) {
  return (
    <div className="summary-cards">
      <div className="card income">
        <h3>Total Income</h3>
        <p>₹{totalIncome.toLocaleString()}</p>
      </div>

      <div className="card expense">
        <h3>Total Expense</h3>
        <p>₹{totalExpense.toLocaleString()}</p>
      </div>

      <div className="card net">
        <h3>Net Income</h3>
        <p>₹{netIncome.toLocaleString()}</p>
      </div>

      <div className="card average">
        <h3>Average Expense</h3>
        <p>₹{averageExpense.toLocaleString()}</p>
      </div>

      <div className="card highest">
        <h3>Highest Expense</h3>
        {highestExpense ? (
          <p>
            ₹{highestExpense.amount.toLocaleString()}
            <span className="highest-title"> ({highestExpense.title})</span>
          </p>
        ) : (
          <p>-</p>
        )}
      </div>
    </div>
  );
}

export default SummaryCards;
