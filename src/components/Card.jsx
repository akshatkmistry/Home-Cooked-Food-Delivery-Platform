import React, { useState, useRef, useEffect } from "react";
import { useDispatchCart, useCart } from "./ContextReducer";
import "./Card.css";

export default function Card(props) {
  const dispatch = useDispatchCart();
  const data = useCart();
  const priceRef = useRef();
  const options = props.options || {};
  const priceOptions = Object.keys(options);
  const item = props.item;
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");

  const finalPrice = qty * parseInt(options[size] || 0);

  useEffect(() => {
    if (priceRef.current) {
      setSize(priceRef.current.value);
    }
  }, []);

  const handleAddToCart = async () => {
    let food = data.find((item) => item.id === props.item._id);

    if (food && food.size === size) {
      await dispatch({
        type: "UPDATE",
        id: props.item._id,
        price: finalPrice,
        qty: qty,
      });
      return;
    }

    await dispatch({
      type: "ADD",
      id: props.item._id,
      name: item.name,
      price: finalPrice,
      qty: qty,
      size: size,
      img: item.img,
    });
  };

  return (
    <div className="card-container">
      <div className="custom-card">
        <div className="price-badge">₹{finalPrice}</div>
        <img
          src={item.img}
          className="card-img-top"
          alt={item.name}
        />
        <div className="card-body">
          <h5 className="card-title">{item.name}</h5>

          <div className="dropdown-group">
            <select
              className="form-select"
              value={qty}
              onChange={(e) => setQty(Number(e.target.value))}
            >
              {Array.from(Array(10), (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>

            <select
              className="form-select"
              ref={priceRef}
              value={size}
              onChange={(e) => setSize(e.target.value)}
            >
              {priceOptions.map((key) => (
                <option key={key} value={key}>
                  {key} (₹{options[key]})
                </option>
              ))}
            </select>
          </div>

          <button className="btn-gradient" onClick={handleAddToCart}>
            🛒 Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
