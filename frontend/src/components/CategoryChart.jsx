// Bonus: simple category-wise expense chart built with plain CSS bars (no chart library needed)

function CategoryChart({ transactions }) {
  const categories = ["Food", "Travel", "Shopping", "Bills", "Entertainment", "Other"];

  // Add up expense amounts for each category
  const categoryTotals = categories.map((category) => {
    const total = transactions
      .filter((transaction) => transaction.type === "expense" && transaction.category === category)
      .reduce((sum, transaction) => sum + transaction.amount, 0);

    return { category, total };
  });

  const highestTotal = Math.max(...categoryTotals.map((item) => item.total), 1);

  return (
    <div className="category-chart">
      <h3>Category-wise Expenses</h3>
      {categoryTotals.map(({ category, total }) => (
        <div className="chart-row" key={category}>
          <span className="chart-label">{category}</span>
          <div className="chart-bar-track">
            <div
              className="chart-bar-fill"
              style={{ width: `${(total / highestTotal) * 100}%` }}
            ></div>
          </div>
          <span className="chart-value">₹{total.toLocaleString()}</span>
        </div>
      ))}
    </div>
  );
}

export default CategoryChart;
