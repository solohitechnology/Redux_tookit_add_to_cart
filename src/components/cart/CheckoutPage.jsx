import React from 'react';

const CheckoutPage = () => {
  return (
    <div className="checkout-container">
      <div className="checkout-content">
        <h2>Checkout</h2>
        <form>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" />

          <label htmlFor="email">Email:</label>
          <input type="email" id="email" />

          <label htmlFor="address">Address:</label>
          <input type="text" id="address" />

          <label htmlFor="cardNumber">Card Number:</label>
          <input type="text" id="cardNumber" />

          <label htmlFor="expiryDate">Expiry Date:</label>
          <input type="text" id="expiryDate" />

          <label htmlFor="cvv">CVV:</label>
          <input type="text" id="cvv" />

          <button type="submit">Pay Now</button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;
