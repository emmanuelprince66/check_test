import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../util/slice/CartSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

export default store;
