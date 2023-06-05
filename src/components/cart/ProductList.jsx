import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} from './CartSlice';
import { Link } from 'react-router-dom';
import "./product.css"

const products = [
  { id: 1, name: 'Product 1', price: 10 },
  { id: 2, name: 'Product 2', price: 20 },
  { id: 3, name: 'Product 3', price: 30 },
];

const ProductList = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [isCartVisible, setCartVisible] = useState(false);

  useEffect(() => {
    if (cartItems.length === 0) {
      const storedCartItems = localStorage.getItem('cartItems');
      if (storedCartItems) {
        dispatch(addToCart(JSON.parse(storedCartItems)));
      }
    }
  }, []);

  const handleAddToCart = (product) => {
    dispatch(addToCart({ product, quantity: 1 }));
  };

  const handleRemoveFromCart = (product) => {
    dispatch(removeFromCart(product));
  };

  const handleIncreaseQuantity = (product) => {
    dispatch(increaseQuantity(product));
  };

  const handleDecreaseQuantity = (product) => {
    dispatch(decreaseQuantity(product));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleToggleCart = () => {
    setCartVisible(!isCartVisible);
  };

  return (
    <div>
      <h2>Products</h2>
      {products.map((product) => (
        <div key={product.id}>
          <p>{product.name}</p>
          <p>${product.price}</p>
          <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
        </div>
      ))}
      <div className="cart-icon" onClick={handleToggleCart}>
        <span className="cart-count">{cartItemCount}</span>
        <i className="fas fa-shopping-cart"></i>
      </div>
      {isCartVisible && (
        <div className="cart-container">
          <div className="cart-content">
            <h2>Cart</h2>
            {cartItems.length > 0 ? (
              <>
                {cartItems.map((item) => (
                  <div key={item.id}>
                    <p>{item.name}</p>
                    <p>${item.price}</p>
                    <button onClick={() => handleRemoveFromCart(item)}>
                      Remove from Cart
                    </button>
                    <button onClick={() => handleDecreaseQuantity(item)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => handleIncreaseQuantity(item)}>+</button>
                  </div>
                ))}
                <p>Total Price: ${getTotalPrice()}</p>
                <Link to="/checkout">
                  <button className="checkout-button">Checkout</button>
                </Link>
                <button onClick={handleClearCart}>Clear Cart</button>
              </>
            ) : (
              <p>No items in the cart</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;
