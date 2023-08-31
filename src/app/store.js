import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../util/slice/CartSlice";
import merchantReducer from "../util/slice/merchantSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    merchantReducer
  },
});

export default store;
