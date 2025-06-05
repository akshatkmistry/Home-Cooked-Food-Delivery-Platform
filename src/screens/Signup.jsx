import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Signup.css'; 

export default function Signup() {
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", geolocation: "", role: "customer" });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const response = await fetch("http://localhost:5000/api/createuser", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },                body: JSON.stringify({
                    name: credentials.name,
                    email: credentials.email,
                    password: credentials.password,
                    location: credentials.geolocation,
                    role: credentials.role
                })
            });

            const json = await response.json();
            console.log(json);
            if (json.success) {
                alert("Account created successfully!");
                window.location.href = "/login";
            } else {
                if (json.errors && json.errors.length > 0) {
                    alert("Validation errors: " + json.errors.map(err => err.msg).join(", "));
                } else {
                    alert("Enter valid credentials");
                }
            }
        } catch (error) {
            console.error("Fetch error:", error);
            alert("Could not connect to the server. Please check if backend is running.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    return (
        <div className="signup-container">
            <div className="signup-card">
                <div className="signup-header">
                    <h1>Create Your Account</h1>
                </div>
                
                <form onSubmit={handleSubmit} className="signup-form">
                    <div className="form-group">
                        <input 
                            type="text" 
                            name="name" 
                            value={credentials.name} 
                            onChange={onChange} 
                            required
                        />
                        <label htmlFor="name">Full Name</label>
                        <span className="input-icon">
                            <i className="fas fa-user"></i>
                        </span>
                    </div>

                    <div className="form-group">
                        <input 
                            type="email" 
                            name="email" 
                            value={credentials.email} 
                            onChange={onChange} 
                            required
                        />
                        <label htmlFor="email">Email Address</label>
                        <span className="input-icon">
                            <i className="fas fa-envelope"></i>
                        </span>
                    </div>

                    <div className="form-group">
                        <input 
                            type="password" 
                            name="password" 
                            value={credentials.password} 
                            onChange={onChange} 
                            required
                        />
                        <label htmlFor="password">Password</label>
                        <span className="input-icon">
                            <i className="fas fa-lock"></i>
                        </span>
                    </div>                    <div className="form-group">
                        <input 
                            type="text" 
                            name="geolocation" 
                            value={credentials.geolocation} 
                            onChange={onChange} 
                            required
                        />
                        <label htmlFor="geolocation">Address</label>
                        <span className="input-icon">
                            <i className="fas fa-map-marker-alt"></i>
                        </span>
                    </div>

                    <div className="form-group">
                        <select 
                            name="role" 
                            value={credentials.role} 
                            onChange={onChange} 
                            className="role-select"
                            required
                        >
                            <option value="customer">Customer</option>
                            <option value="chef">Chef</option>
                        </select>
                        <label htmlFor="role">I am a</label>
                        <span className="input-icon">
                            <i className="fas fa-users"></i>
                        </span>
                    </div>

                    <button type="submit" className="signup-btn" disabled={isSubmitting}>
                        {isSubmitting ? (
                            <>
                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                Creating Account...
                            </>
                        ) : (
                            "Sign Up"
                        )}
                    </button>

                    <div className="signup-footer">
                        <p>Already have an account? <Link to="/login" className="login-link">Log In</Link></p>
                    </div>
                </form>
            </div>
            
            <div className="signup-decoration">
                <div className="decoration-circle circle-1"></div>
                <div className="decoration-circle circle-2"></div>
                <div className="decoration-circle circle-3"></div>
            </div>
        </div>
    );
}