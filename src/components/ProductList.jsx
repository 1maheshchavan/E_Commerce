import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import FilterSortBar from "./FilterSortBar";

const ProductList = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sortType, setSortType] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(500);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get("https://api.escuelajs.co/api/v1/products");
      setProducts(data);
      setFilteredProducts(data);
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    filterProducts(search, category, minPrice, maxPrice);
  }, [search, category, minPrice, maxPrice]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleSort = (e) => {
    const sortBy = e.target.value;
    setSortType(sortBy);
    const sorted = [...filteredProducts].sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      return 0;
    });
    setFilteredProducts(sorted);
  };

  const filterProducts = (search, category, minPrice, maxPrice) => {
    let filtered = products.filter((product) =>
      product.title.toLowerCase().includes(search.toLowerCase())
    );
    if (category) {
      filtered = filtered.filter((product) => product.category.name === category);
    }
    filtered = filtered.filter(
      (product) => product.price >= minPrice && product.price <= maxPrice
    );
    setFilteredProducts(filtered);
  };

  const handlePriceChange = (value, type) => {
    if (type === "min") {
      setMinPrice(Number(value));
    } else if (type === "max") {
      setMaxPrice(Number(value));
    }
  };

  return (
    <div className="container-fluid my-4">
      <div className="row">
        <div className="col-md-2 p-3" style={{ position: "fixed", top: "0", left: "0", height: "100%", overflowY: "auto" }}>
          <FilterSortBar
            search={search}
            handleSearch={handleSearch}
            category={category}
            handleCategoryChange={handleCategoryChange}
            handleSort={handleSort}
            minPrice={minPrice}
            maxPrice={maxPrice}
            handlePriceChange={handlePriceChange}
          />
        </div>

        <div className="col-md-10 offset-md-2">
          <h1 className="text-center mb-4">Products List</h1>
          <div className="row">
            {filteredProducts.map((product) => (
              <div key={product.id} className="col-md-4 mb-4">
                <div className="card h-100">
                  <img
                    src={product.images[0]}
                    className="card-img-top"
                    alt={product.title}
                    style={{ maxHeight: "200px", objectFit: "contain" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{product.title}</h5>
                    <p className="card-text">Price: ${product.price}</p>
                    <p className="card-text">Category: {product.category.name}</p>
                    <Link to={`/product/${product.id}`} className="btn btn-primary">
                      View Details
                    </Link>
                    <button
                      onClick={() => addToCart(product)}
                      className="btn btn-success ms-2"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
