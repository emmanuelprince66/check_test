import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    clearCart: (state) => {
      return [];
    },
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.find((item) => item.id === newItem.id);

      if (existingItem) {
        existingItem.counter += 1;
        existingItem.price += newItem.price;
      } else {
        state.push({ ...newItem, counter: 1 }); // Initialize counter with 1
      }
    },
    removeFromCart: (state, action) => {
      const itemId = action.payload;
      return state.filter((item) => item.id !== itemId);
    },
    incrementCounter: (state, action) => {
      const itemId = action.payload;
      const itemToIncrement = state.find((item) => item.id === itemId);

      if (itemToIncrement) {
        itemToIncrement.counter += 1;
        itemToIncrement.price +=
          itemToIncrement.price / (itemToIncrement.counter - 1); // Increment the price by the original price per item
      }
    },
    decrementCounter: (state, action) => {
      const itemId = action.payload;
      const itemToDecrement = state.find((item) => item.id === itemId);

      if (itemToDecrement && itemToDecrement.counter > 1) {
        itemToDecrement.counter -= 1;
        const originalPricePerItem =
          itemToDecrement.price / (itemToDecrement.counter + 1);
        itemToDecrement.price = originalPricePerItem * itemToDecrement.counter;
      }
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  incrementCounter,
  decrementCounter,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
