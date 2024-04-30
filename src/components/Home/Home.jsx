import React from 'react';
import { Link } from 'react-router-dom';
import ProductList from '../cart/ProductList';
import "./home.css"

const HomePage = () => {
  return (
    <div className="homepage">
      <header className="header">
        <div className="logo">YourStore</div>
        <nav className="navbar">
          <ul>
            <li><Link to="/products">Shop All</Link></li>
            <li><Link to="/cart">Cart</Link></li>
          </ul>
        </nav>
      </header>
      <main className="main-content">
        <ProductList />
      </main>
      <footer className="footer">
        <p>&copy; 2024 YourStore. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
