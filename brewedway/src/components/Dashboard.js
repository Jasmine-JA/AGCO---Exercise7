import React from 'react';
import { User, Coffee, ShoppingBag, Heart, LogOut } from 'lucide-react';
import '../styles/Dashboard.css';

function Dashboard({ user, handleLogout }) {
  return (
    <div className="dashboard-container">
      <nav className="dashboard-nav">
        <div className="nav-content">
          <div className="nav-brand">
            <Coffee className="nav-icon" />
            <h1 className="nav-title">BREWEDWAY</h1>
          </div>
          <button onClick={handleLogout} className="logout-btn">
            <LogOut className="logout-icon" />
            Logout
          </button>
        </div>
      </nav>

      <div className="dashboard-content">
        <div className="welcome-card">
          <div className="welcome-header">
            <div className="user-avatar">
              <User className="avatar-icon" />
            </div>
            <div>
              <h2 className="welcome-title">Welcome back, {user?.name}!</h2>
              <p className="user-email">{user?.email}</p>
            </div>
          </div>
          <p className="welcome-text">Your daily dose of comfort awaits. Explore our menu and enjoy!</p>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon-wrapper orders">
              <ShoppingBag className="feature-icon" />
            </div>
            <h3 className="feature-title">My Orders</h3>
            <p className="feature-desc">View your order history and track deliveries</p>
            <button className="feature-link">View Orders →</button>
          </div>

          <div className="feature-card">
            <div className="feature-icon-wrapper favorites">
              <Heart className="feature-icon" />
            </div>
            <h3 className="feature-title">Favorites</h3>
            <p className="feature-desc">Your favorite coffee selections</p>
            <button className="feature-link">View Favorites →</button>
          </div>

          <div className="feature-card">
            <div className="feature-icon-wrapper menu">
              <Coffee className="feature-icon" />
            </div>
            <h3 className="feature-title">Browse Menu</h3>
            <p className="feature-desc">Discover our premium coffee selection</p>
            <button className="feature-link">Shop Now →</button>
          </div>
        </div>

        <div className="activity-card">
          <h3 className="activity-title">Recent Activity</h3>
          <div className="activity-list">
            <div className="activity-item order">
              <Coffee className="activity-icon" />
              <div className="activity-info">
                <p className="activity-name">Caramel Latte ordered</p>
                <p className="activity-date">2 days ago</p>
              </div>
              <span className="activity-price">₱180</span>
            </div>
            <div className="activity-item favorite">
              <Heart className="activity-icon" />
              <div className="activity-info">
                <p className="activity-name">Added Cappuccino to favorites</p>
                <p className="activity-date">5 days ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;