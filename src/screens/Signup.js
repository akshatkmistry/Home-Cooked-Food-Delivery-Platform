import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Signup.css'; 

export default function Signup() {
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", geolocation: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const response = await fetch("http://192.168.38.20:5000/api/Createuser", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: credentials.name,
                    email: credentials.email,
                    password: credentials.password,
                    location: credentials.geolocation
                })
            });

            const json = await response.json();
            console.log(json);
            if (json.success) {
                alert("Account created successfully!");
                window.location.href = "/login";
            }
            if (!json.success) {
                alert("Enter valid credentials");
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
                    <p>Join our community today</p>
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
                    </div>

                    <div className="form-group">
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