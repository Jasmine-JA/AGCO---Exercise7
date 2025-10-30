import React from 'react';
import { User, Mail, Lock, Coffee } from 'lucide-react';
import '../styles/Register.css';

function Register({ registerForm, setRegisterForm, errors, handleRegister, setCurrentPage, setErrors }) {
  return (
    <div className="register-container">
      <div className="register-card">
        <div className="register-header">
          <Coffee className="logo-icon" />
          <h1 className="brand-name">BREWEDWAY</h1>
          <p className="tagline">Join Our Coffee Community</p>
        </div>
        
        <div className="register-content">
          <h2 className="register-title">Create Account</h2>
          
          <div>
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <div className="input-wrapper">
                <User className="input-icon" />
                <input
                  type="text"
                  value={registerForm.name}
                  onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })}
                  className="form-input"
                  placeholder="John Doe"
                />
              </div>
              {errors.name && <p className="error-text">{errors.name}</p>}
            </div>

            <div className="form-group">
              <label className="form-label">Email</label>
              <div className="input-wrapper">
                <Mail className="input-icon" />
                <input
                  type="email"
                  value={registerForm.email}
                  onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
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
                  value={registerForm.password}
                  onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                  className="form-input"
                  placeholder="Minimum 6 characters"
                />
              </div>
              {errors.password && <p className="error-text">{errors.password}</p>}
            </div>

            <div className="form-group">
              <label className="form-label">Confirm Password</label>
              <div className="input-wrapper">
                <Lock className="input-icon" />
                <input
                  type="password"
                  value={registerForm.confirmPassword}
                  onChange={(e) => setRegisterForm({ ...registerForm, confirmPassword: e.target.value })}
                  onKeyPress={(e) => e.key === 'Enter' && handleRegister()}
                  className="form-input"
                  placeholder="Re-enter password"
                />
              </div>
              {errors.confirmPassword && <p className="error-text">{errors.confirmPassword}</p>}
            </div>

            <button onClick={handleRegister} className="submit-btn">
              Create Account
            </button>
          </div>

          <div className="form-footer">
            <p className="footer-text">
              Already have an account?{' '}
              <button
                onClick={() => {
                  setCurrentPage('login');
                  setErrors({});
                }}
                className="link-btn"
              >
                Login
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;