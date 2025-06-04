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
  
  // Function to check if user is logged in
  const isLoggedIn = () => {
    return localStorage.getItem("authtoken") !== null;
  };
  
  // Function to handle navigation
  const handleNavigate = (path) => {
    navigate(path);
  };  return (
    <>
      <nav className="navbar navbar-expand-lg glass-navbar fixed-top">
        <div className="container">
          <Link 
            className="navbar-brand fs-3 fw-bold text-white brand-animate" 
            onClick={() => handleNavigate('/')}
            style={{ cursor: 'pointer' }}
          >
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
                <div 
                  className="nav-link icon-link" 
                  onClick={() => handleNavigate('/')} 
                  title="Home"
                  style={{ cursor: 'pointer' }}
                >
                  <FiHome size={20} />
                </div>
              </li>
              {isLoggedIn() && (
                <li className="nav-item">
                  <div 
                    className="nav-link icon-link" 
                    onClick={() => handleNavigate('/myorder')} 
                    title="My Orders"
                    style={{ cursor: 'pointer' }}
                  >
                    <FiClipboard size={20} />
                  </div>
                </li>
              )}
            </ul>            <div className="d-flex align-items-center gap-3">
              {!isLoggedIn() ? (
                <>
                  <div
                    className="btn icon-btn btn-outline-light"
                    onClick={() => handleNavigate('/login')}
                    title="Login"
                    style={{ cursor: 'pointer' }}
                  >
                    <FiLogIn size={18} />
                  </div>
                  <div
                    className="btn icon-btn btn-brand"
                    onClick={() => handleNavigate('/createuser')}
                    title="Register"
                    style={{ cursor: 'pointer' }}
                  >
                    <FiUserPlus size={18} />
                  </div>
                </>
              ) : (
                <>
                  <div
                    className="position-relative cart-icon"
                    onClick={() => setCartView(true)}
                    title="Cart"
                    role="button"
                    style={{ cursor: 'pointer' }}
                  >
                    <FiShoppingCart size={22} className="text-white" />
                    {data && data.length > 0 && (
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
