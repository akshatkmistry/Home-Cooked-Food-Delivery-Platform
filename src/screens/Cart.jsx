import React from 'react';
import { useCart, useDispatchCart } from '../components/ContextReducer';
import DeleteIcon from '@mui/icons-material/Delete';
import './Cart.css';

export default function Cart() {
  const data = useCart();
  const dispatch = useDispatchCart();

  const totalPrice = data.reduce((total, food) => total + food.price, 0);

  const handleCheckOut = async () => {
    const userEmail = localStorage.getItem('userEmail');

    const response = await fetch('http://localhost:5000/api/orderData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        order_data: data,
        email: userEmail,
        order_date: new Date().toLocaleString(),
      }),
    });

    if (response.status === 200) {
      dispatch({ type: 'DROP' });
    }
  };
  if (data.length === 0) {
    return (
      <div className="cart-container">
        <div className="container">
          <div className="empty-cart">
            <div className="empty-cart-icon">🛒</div>
            <h3>Your Cart is Empty</h3>
            <p>Looks like you haven't added any delicious items to your cart yet!</p>
            <a href="/" className="checkout-btn" style={{ textDecoration: 'none' }}>
              🍽️ Start Ordering
            </a>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="cart-container">
      <div className="container">
        <div className="cart-card">
          <div className="cart-header">
            <h2 className="cart-title">🛍️ Your Cart</h2>
          </div>
          
          <div className="cart-table-container">
            <table className="table cart-table align-middle text-center">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Item</th>
                  <th>Qty</th>
                  <th>Size</th>
                  <th>Price (₹)</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody>
                {data.map((food, index) => (
                  <tr key={index} className="cart-item">
                    <td><strong>{index + 1}</strong></td>
                    <td className="item-name">{food.name}</td>
                    <td><span className="item-qty">{food.qty}</span></td>
                    <td><span className="item-size">{food.size}</span></td>
                    <td className="item-price">₹{food.price}</td>
                    <td>
                      <button
                        className="remove-btn"
                        onClick={() => dispatch({ type: 'REMOVE', index })}
                        title="Remove from cart"
                      >
                        <DeleteIcon />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="cart-footer">
            <h4 className="total-price">Total: ₹{totalPrice}</h4>
            <button className="checkout-btn" onClick={handleCheckOut}>
              ✅ Check Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
