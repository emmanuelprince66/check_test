import { createSlice } from "@reduxjs/toolkit";

const merchantSlice = createSlice({
  name: "merchantDetails",
  initialState: {
    data: [],
    orders: [{ id: 1, amount: "", cart: [] }],
    orderInView: null,
    totalAmount: 0,
  },
  reducers: {
    populateMerchantDetails: (state, action) => {
      state.data = action.payload;
      console.log(action.payload, "layisade");
    },
    addOrders: (state, action) => {
      state.orders.push(action.payload);
    },
    addItemsToCart: (state, action) => {
      const orderIndex = state.orders.findIndex(
        (item) => item.id === state.orderInView
      );
      console.log(orderIndex, action.payload, "ayaga");
      let existingItem = state.orders[orderIndex].cart.find(
        (item) => item.name === action.payload.order.name
      );

      if (existingItem) {
        const updatedItem = { ...existingItem };
        updatedItem.price += action.payload.price;

        const itemIndex = state.orders[orderIndex].cart.findIndex(
          (item) => item.name === action.payload.order.name
        );
        state.orders[orderIndex].cart[itemIndex] = updatedItem;
      } else {
        state.orders[orderIndex]?.cart.push(action.payload.order);
      }

      const amount = state.orders.reduce(
        (acc, curr) =>
          acc +
          curr.cart.reduce((subTotal, item) => (subTotal += item.price), 0),
        0
      );
      state.totalAmount = amount;
      console.log(state.totalAmount, action.payload.amount);
    },
    setOrderInView: (state, action) => {
      state.orderInView = action.payload;
    },
  },
});

export const {
  populateMerchantDetails,
  addOrders,
  addItemsToCart,
  setOrderInView,
} = merchantSlice.actions;
export default merchantSlice.reducer;
