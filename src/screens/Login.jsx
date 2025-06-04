import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

export default function Login() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    try {
      const response = await fetch("http://localhost:5000/api/loginuser", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password
        })
      });      const json = await response.json();
      console.log(json);

      if (!json.success) {
        if (json.error) {
          setError(json.error);
        } else {
          setError("Invalid email or password");
        }      } else {
        localStorage.setItem('userEmail', credentials.email);
        localStorage.setItem('authtoken', json.authToken);
        localStorage.setItem('userRole', json.role);
        
        // Navigate based on role
        if (json.role === 'chef') {
          navigate("/chef-dashboard");
        } else {
          navigate("/");
        }
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setError("Could not connect to the server");
    } finally {
      setIsLoading(false);
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    setError("");
  };

  return (
    <div className="login-page">
      <div className="bg-shape shape-1"></div>
      <div className="bg-shape shape-2"></div>
      <div className="bg-shape shape-3"></div>
      <div className="bg-shape shape-4"></div>
      <div className="bg-shape shape-5"></div>
      
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <h1>Welcome Back to</h1>
            <h2>Foodela</h2>
            <p>Sign in to continue your journey</p>
            {error && <div className="login-error">{error}</div>}
          </div>
          
          <form onSubmit={handleSubmit} className="login-form">
            <div className="input-group">
              <input 
                type="email" 
                name="email" 
                value={credentials.email} 
                onChange={onChange}
                required
                autoComplete="username"
              />
              <label>Email Address</label>
              <span className="input-icon">✉️</span>
            </div>

            <div className="input-group">
              <input 
                type="password" 
                name="password" 
                value={credentials.password} 
                onChange={onChange}
                required
                autoComplete="current-password"
              />
              <label>Password</label>
              <span className="input-icon">🔒</span>
            </div>

            <button type="submit" className="login-btn" disabled={isLoading}>
              {isLoading ? (
                <span className="spinner"></span>
              ) : (
                "Sign In"
              )}
            </button>

            <div className="login-footer">
              <span>New here?</span>
              <Link to="/createuser" className="register-link">Create an account</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}