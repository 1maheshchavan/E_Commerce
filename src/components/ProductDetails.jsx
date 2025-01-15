import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProductDetails = ({ addToCart }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios.get(`https://fakestoreapi.com/products/${id}`).then((response) => {
      setProduct(response.data);
    });
  }, [id]);

  if (!product) return <div className="text-center mt-5">Loading...</div>;

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-md-6 d-flex justify-content-center align-items-center">
          <img
            src={product.image}
            alt={product.title}
            className="img-fluid rounded"
            style={{ maxHeight: "400px" }}
          />
        </div>
        <div className="col-md-6">
          <h1 className="display-5 mb-3">{product.title}</h1>
          <p className="h4 text-success">${product.price}</p>
          <p className="text-muted">{product.description}</p>
          <p>
            <strong>Rating:</strong> {product.rating.rate} / 5
          </p>
          <p>
            <strong>Category:</strong> {product.category}
          </p>
          <button
            className="btn btn-primary btn-lg mt-3"
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;