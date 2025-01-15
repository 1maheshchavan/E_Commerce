import React from "react";
import { useNavigate } from "react-router-dom";

const Cart = ({ cart, setCart }) => {
  const navigate = useNavigate();

  const updateQuantity = (id, increment) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + (increment ? 1 : -1) }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="container flex-column justify-content-center align-items-center min-vh-100">
      <button className="btn btn-secondary mb-4" onClick={() => navigate("/")}>Back</button>

      {cart.length > 0 ? (
        <>
          {cart.map((item) => (
            <div key={item.id} className="card mb-5 shadow-sm w-100">
              <div className="row g-3 align-items-center">
                <div className="col-md-2">
                  <img src={item.image} alt={item.title} className="img-fluid rounded-start" />
                </div>
                <div className="col-md-7">
                  <div className="card-body">
                    <h5 className="card-title">{item.title}</h5>
                    <p className="card-text text-muted">Price: ${item.price.toFixed(2)}</p>
                    <div className="d-flex align-items-center">
                      <button
                        className="btn btn-outline-primary me-2"
                        onClick={() => updateQuantity(item.id, false)}
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span className="mx-2 fw-bold">{item.quantity}</span>
                      <button
                        className="btn btn-outline-primary me-2"
                        onClick={() => updateQuantity(item.id, true)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <div className="col-md-3 text-center">
                  <button
                    className="btn btn-danger mt-2"
                    onClick={() => removeItem(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
          <div className="text-end mt-4">
            <h3 className="fw-bold">Total: ${totalPrice.toFixed(2)}</h3>
          </div>
        </>
      ) : (
        <div className="text-center">
          <p className="alert alert-warning">Your cart is empty.</p>
        </div>
      )}
    </div>
  );
};

export default Cart;
