import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PaystackPayment from '../payment/Payment';
import {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} from './CartSlice';
import { Link } from 'react-router-dom';
import axios from 'axios';
import "./product.css";

const ProductList = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [products, setProducts] = useState([]);
  const [isCartVisible, setCartVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);

  useEffect(() => {
    fetchProducts();
  }, []);


  const fetchProducts = async () => {
    try {
      const response = await axios.get('https://fakestoreapi.com/products');
      console.log(response)
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

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

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <h2>Products</h2>
      <div className="product-container" style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around"
      }}
      >
        {currentProducts.map((product) => (
          <div key={product.id} className="product-item">
            <img src={product.image} style={{ width: "100px", height: "100px" }} alt="" />
            <div className="product-info">
              <p className="product-title">{product.title.length > 20 ? `${product.title.substring(0, 20)}...` : product.title}</p>

              <p>${product.price}</p>
            </div>
            <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>
      <div className="pagination" style={{ display: "flex", justifyContent: "space-around", maxWidth: "150px", marginTop: "20px" }}>
        {Array.from({ length: Math.ceil(products.length / productsPerPage) }).map((_, index) => (
          <button key={index} onClick={() => paginate(index + 1)}>{index + 1}</button>
        ))}
      </div>
      <div className="cart-icon" onClick={handleToggleCart}>
        {cartItemCount > 0 && <span className="cart-count">{cartItemCount}</span>}
        <i className="fas fa-shopping-cart"></i>
      </div>
      {isCartVisible && (
        <div className="cart-container">
          <div className="cart-content">
            <h2>Cart</h2>
            {cartItems.length > 0 ? (
              <>
                {cartItems.map((item) => (
                  <div key={item.id} className='solohitech'>
                    <p>{item.name}</p>
                    <img src={item.image} style={{ width: "100px", height: "100px" }} alt="" />
                    <p>${item.price}</p>
                    <button
                      onClick={() => handleRemoveFromCart(item)}
                      style={{
                        background: "#80bf91",
                        padding: "5px",
                        border: "none",
                        cursor: "pointer",
                        margin: "10px",
                        color: "whitesmoke",
                        borderRadius: "5px",
                        transition: "background 0.3s ease"
                      }}
                    >
                      Remove from Cart
                    </button>
                    <button
                      onClick={() => handleDecreaseQuantity(item)}
                      style={{
                        background: "#80bf91",
                        padding: "5px",
                        border: "none",
                        cursor: "pointer",
                        margin: "10px",
                        color: "whitesmoke",
                        borderRadius: "5px",
                        transition: "background 0.3s ease"
                      }}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => handleIncreaseQuantity(item)}
                      style={{
                        background: "#80bf91",
                        padding: "5px",
                        border: "none",
                        cursor: "pointer",
                        margin: "10px",
                        color: "whitesmoke",
                        borderRadius: "5px",
                        transition: "background 0.3s ease"
                      }}
                    >
                      +
                    </button>
                  </div>
                ))}

                <p>Total Price: ${getTotalPrice()}</p>
                <PaystackPayment />
                <button
                  style={{
                    background: "#80bf91",
                    padding: "5px",
                    border: "none",
                    cursor: "pointer",
                    margin: "10px",
                    color: "whitesmoke",
                    borderRadius: "5px",
                    transition: "background 0.3s ease"
                  }}
                  onClick={handleClearCart}
                >Clear Cart</button>
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
