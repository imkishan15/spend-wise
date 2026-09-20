// Category filter dropdown
// The dropdown UI is already built for you - use `selectedCategory` in App.jsx
// to actually filter the transactions (see the TODO in App.jsx)

const CATEGORIES = ["All", "Food", "Travel", "Shopping", "Bills", "Entertainment", "Salary", "Other"];

function Filter({ selectedCategory, onCategoryChange }) {
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
    </div>
  );
}

export default Filter;
