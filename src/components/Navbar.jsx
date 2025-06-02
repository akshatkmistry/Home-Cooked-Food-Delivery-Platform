import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './Navbar.css';

import { useCart } from './ContextReducer';
import {
  FiHome,
  FiUserPlus,
  FiLogIn,
  FiLogOut,
  FiShoppingCart,
  FiClipboard
} from 'react-icons/fi';
import Model from '../Model';
import Cart from '../screens/Cart';

export default function Navbar() {
  const [cartView, setCartView] = useState(false);
  const data = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authtoken");
    navigate("/login");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg glass-navbar fixed-top">
        <div className="container">
          <Link className="navbar-brand fs-3 fw-bold text-white brand-animate" to="/">
            🍽️ <span className="text-brand">Foodela</span>
          </Link>

          <button
            className="navbar-toggler border-0"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mx-auto gap-3">
              <li className="nav-item">
                <Link className="nav-link icon-link" to="/" title="Home">
                  <FiHome size={20} />
                </Link>
              </li>
              {localStorage.getItem("authtoken") && (
                <li className="nav-item">
                  <Link className="nav-link icon-link" to="/myOrder" title="My Orders">
                    <FiClipboard size={20} />
                  </Link>
                </li>
              )}
            </ul>

            <div className="d-flex align-items-center gap-3">
              {!localStorage.getItem("authtoken") ? (
                <>
                  <Link
                    to="/login"
                    className="btn icon-btn btn-outline-light"
                    title="Login"
                  >
                    <FiLogIn size={18} />
                  </Link>
                  <Link
                    to="/createuser"
                    className="btn icon-btn btn-brand"
                    title="Register"
                  >
                    <FiUserPlus size={18} />
                  </Link>
                </>
              ) : (
                <>
                  <div
                    className="position-relative cart-icon"
                    onClick={() => setCartView(true)}
                    title="Cart"
                  >
                    <FiShoppingCart size={22} className="text-white" />
                    {data.length > 0 && (
                      <span className="cart-badge">{data.length}</span>
                    )}
                  </div>

                  <button
                    className="btn icon-btn btn-danger"
                    onClick={handleLogout}
                    title="Logout"
                  >
                    <FiLogOut size={18} />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {cartView && (
        <Model onClose={() => setCartView(false)}>
          <Cart />
        </Model>
      )}
    </>
  );
}
