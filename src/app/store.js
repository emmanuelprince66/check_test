import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../util/slice/CartSlice";
import merchantReducer from "../util/slice/merchantSlice";
import {persistReducer,persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
const persistConfig ={
  key:'root',
  storage
}
const persistedReducer = persistReducer(persistConfig,merchantReducer)

const store = configureStore({
  reducer: {
    cart: cartReducer,
   merchantReducer: persistedReducer
  },
});
const persistor = persistStore(store)

export  {store,persistor};
