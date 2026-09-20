// Filter and sort controls for the transaction table

const CATEGORIES = ["All", "Food", "Travel", "Shopping", "Bills", "Entertainment", "Salary", "Other"];

function Filter({
  selectedCategory,
  onCategoryChange,
  selectedMonth,
  onMonthChange,
  months,
  sortBy,
  sortOrder,
  onSortChange,
}) {
  return (
    <div className="filter-bar">
      <div className="filter-group">
        <label htmlFor="category-filter">Category</label>
        <select
          id="category-filter"
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
        >
          {CATEGORIES.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Bonus: Monthly filter */}
      <div className="filter-group">
        <label htmlFor="month-filter">Month</label>
        <select
          id="month-filter"
          value={selectedMonth}
          onChange={(e) => onMonthChange(e.target.value)}
        >
          <option value="All">All</option>
          {months.map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>
      </div>

      {/* Bonus: Sorting */}
      <div className="filter-group">
        <label htmlFor="sort-by">Sort By</label>
        <select
          id="sort-by"
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value, sortOrder)}
        >
          <option value="none">None</option>
          <option value="amount">Amount</option>
          <option value="date">Date</option>
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="sort-order">Order</label>
        <select
          id="sort-order"
          value={sortOrder}
          onChange={(e) => onSortChange(sortBy, e.target.value)}
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
    </div>
  );
}

export default Filter;
