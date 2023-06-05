import { createSlice } from '@reduxjs/toolkit';

const loadCartItems = () => {
  const cartItems = localStorage.getItem('cartItems');
  return cartItems ? JSON.parse(cartItems) : [];
};

const saveCartItems = (cartItems) => {
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: loadCartItems(),
  },
  reducers: {
    addToCart: (state, action) => {
      const { product, quantity } = action.payload;
      const existingItem = state.items.find((item) => item.id === product.id);
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({ ...product, quantity });
      }
      saveCartItems(state.items);
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(
        (item) => item.id !== action.payload.id
      );
      saveCartItems(state.items);
    },
    increaseQuantity: (state, action) => {
      const { id } = action.payload;
      const item = state.items.find((item) => item.id === id);
      if (item) {
        item.quantity++;
        saveCartItems(state.items);
      }
    },
    decreaseQuantity: (state, action) => {
      const { id } = action.payload;
      const item = state.items.find((item) => item.id === id);
      if (item && item.quantity > 1) {
        item.quantity--;
        saveCartItems(state.items);
      }
    },
    clearCart: (state) => {
      state.items = [];
      saveCartItems(state.items);
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
