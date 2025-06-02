import React from 'react';
import { useCart, useDispatchCart } from '../components/ContextReducer';
import DeleteIcon from '@mui/icons-material/Delete';

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
      <div className="container text-center mt-5">
        <h3 className="text-muted">🛒 Your Cart is Empty</h3>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <div className="card shadow p-4">
        <h2 className="mb-4 text-center text-success">🛍️ Your Cart</h2>
        <div className="table-responsive">
          <table className="table align-middle table-bordered text-center">
            <thead className="table-success">
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
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{food.name}</td>
                  <td>{food.qty}</td>
                  <td>{food.size}</td>
                  <td>{food.price}</td>
                  <td>
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => dispatch({ type: 'REMOVE', index })}
                    >
                      <DeleteIcon />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="d-flex justify-content-between align-items-center mt-4 px-2">
          <h4>Total: ₹{totalPrice}</h4>
          <button className="btn btn-success btn-lg px-4" onClick={handleCheckOut}>
            ✅ Check Out
          </button>
        </div>
      </div>
    </div>
  );
}
