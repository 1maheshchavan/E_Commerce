import React from "react";

const FilterSortBar = ({
  search,
  handleSearch,
  category,
  handleCategoryChange,
  handleSort,
  minPrice,
  maxPrice,
  handlePriceChange,
}) => {
  return (
    <div
      className="bg-light p-3"
      style={{
        height: "auto",
        borderRadius: "5px",
        width: "230px",
        marginTop: "40px",
      }}
    >
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by name"
          value={search}
          onChange={handleSearch}
        />
      </div>

      <div className="mb-3">
        <select
          className="form-select"
          value={category}
          onChange={handleCategoryChange}
        >
          <option value="">All Categories</option>
          <option value="clothes">Clothes</option>
          <option value="electronics">Electronics</option>
          <option value="furniture">Furniture</option>
          <option value="shoes">Shoes</option>
          <option value="others">Others</option>
        </select>
      </div>

      <div className="mb-3">
        <select className="form-select" onChange={handleSort}>
          <option value="">Sort by</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>
      </div>

      <div className="mt-3">
        <h6>Price Range</h6>
        <div className="d-flex justify-content-between">
          <span>${minPrice}</span>
          <span>${maxPrice}</span>
        </div>

        <input
          type="range"
          min="0"
          max="500"
          value={minPrice}
          onChange={(e) => handlePriceChange(e.target.value, "min")}
          className="form-range"
        />

        <input
          type="range"
          min="0"
          max="500"
          value={maxPrice}
          onChange={(e) => handlePriceChange(e.target.value, "max")}
          className="form-range"
        />
      </div>
    </div>
  );
};

export default FilterSortBar;