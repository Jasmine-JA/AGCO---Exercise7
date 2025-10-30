import React from 'react';
import { Mail, Lock, Coffee } from 'lucide-react';
import '../styles/Login.css';

function Login({ loginForm, setLoginForm, errors, handleLogin, setCurrentPage, setErrors }) {
  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <Coffee className="logo-icon" />
          <h1 className="brand-name">BREWEDWAY</h1>
          <p className="tagline">Your Daily Dose of Comfort</p>
        </div>
        
        <div className="login-content">
          <h2 className="login-title">Welcome Back</h2>
          
          <div>
            <div className="form-group">
              <label className="form-label">Email</label>
              <div className="input-wrapper">
                <Mail className="input-icon" />
                <input
                  type="email"
                  value={loginForm.email}
                  onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                  className="form-input"
                  placeholder="your@email.com"
                />
              </div>
              {errors.email && <p className="error-text">{errors.email}</p>}
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <div className="input-wrapper">
                <Lock className="input-icon" />
                <input
                  type="password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                  onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                  className="form-input"
                  placeholder="Enter your password"
                />
              </div>
              {errors.password && <p className="error-text">{errors.password}</p>}
            </div>

            <button onClick={handleLogin} className="submit-btn">
              Login
            </button>
          </div>

          <div className="form-footer">
            <p className="footer-text">
              Don't have an account?{' '}
              <button
                onClick={() => {
                  setCurrentPage('register');
                  setErrors({});
                }}
                className="link-btn"
              >
                Sign Up
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;