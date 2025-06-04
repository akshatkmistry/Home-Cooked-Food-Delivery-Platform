import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import "./MyOrder.css";

export default function MyOrder() {
  const [groupedOrders, setGroupedOrders] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMyOrder = async () => {
    try {
      setLoading(true);
      
      // Check if user is logged in
      const userEmail = localStorage.getItem('userEmail');
      if (!userEmail) {
        setError("You need to login first");
        setLoading(false);
        return;
      }
      
      const res = await fetch("http://localhost:5000/api/myOrderData", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userEmail,
        }),
      });      const result = await res.json();
      const nestedData = result.order_data || [];

      // Flatten nested arrays and group by Order_date
      const grouped = {};
      nestedData.forEach(orderGroup => {
        if (!Array.isArray(orderGroup)) return;

        let currentDate = null;
        orderGroup.forEach(item => {
          if (item.Order_date) {
            currentDate = item.Order_date;
            if (!grouped[currentDate]) grouped[currentDate] = [];
          } else if (currentDate) {
            grouped[currentDate].push(item);
          }
        });
      });

      setGroupedOrders(grouped);
    } catch (error) {
      console.error("Fetch order failed:", error);
      setError("Failed to fetch orders: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyOrder();
  }, []);

  return (
    <>
      <Navbar />
      <div className="myorder-container container py-4">
        <h2 className="text-center mb-4">My Orders</h2>
        
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-success" role="status" />
            <p className="mt-3">Loading your orders...</p>
          </div>
        ) : error ? (
          <div className="alert alert-danger mt-3">{error}</div>
        ) : Object.keys(groupedOrders).length === 0 ? (
          <h5 className="text-center text-muted">You have no past orders.</h5>
        ) : (
          Object.entries(groupedOrders)
            .reverse()
            .map(([date, items], index) => (
            <div key={index} className="mb-5">
              <h6 className="order-date text-center mb-3">
                <span className="badge bg-light text-dark shadow-sm px-3 py-2">
                  Order Date: {date}
                </span>
              </h6>
              <div className="row justify-content-center gx-4 gy-4">
                {items.map((item, idx) => (
                  <div key={idx} className="col-12 col-sm-6 col-md-4 col-lg-3">
                    <div className="order-card shadow-sm rounded-4 overflow-hidden h-100">
                      <img
                        src={item.img}
                        alt={item.name}
                        className="order-card-img"
                      />
                      <div className="p-3">
                        <h5 className="fw-semibold mb-2">{item.name}</h5>
                        <div className="d-flex flex-wrap gap-2 mb-2">
                          <span className="badge bg-secondary">Qty: {item.qty}</span>
                          <span className="badge bg-info text-dark">Size: {item.size}</span>
                        </div>
                        <div className="text-success fw-bold fs-6">
                          ₹{item.price}/-
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
      )}
    </div>
    <Footer />
  </>
);
}