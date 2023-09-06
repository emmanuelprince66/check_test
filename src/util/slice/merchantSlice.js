import { createSlice } from "@reduxjs/toolkit";

const merchantSlice = createSlice({
  name: "merchantDetails",
  initialState: {
    data: [],
    orderCart:[],
    orders: [{ id: 1, amount: 0.00, cart: [] }],
    orderInView: null,
    categoryNameInView:'',
    totalAmount: 0,
  },
  reducers: {
    populateMerchantDetails: (state, action) => {
      state.data = action.payload;
    },
    setCategoryNameInView: (state, action) => {
      state.categoryNameInView = action.payload;
    },
    addOrders: (state, action) => {
      state.orders.push(action.payload);
    },
    addItemsToCart: (state, action) => {
      const orderIndex = state.orders.findIndex(
        (item) => item.id === state.orderInView
      );
      console.log(orderIndex, action.payload, "ayaga");
      let existingItem = state.orders[orderIndex]?.cart?.find(
        (item) => item.name === action.payload.order.name
      );



      if (existingItem) {
        const updatedItem = { ...existingItem };
        updatedItem.price += action.payload.order.price;

        const itemIndex = state.orders[orderIndex].cart.findIndex(
          (item) => item.name === action.payload.order.name
        );
        state.orders[orderIndex].cart[itemIndex] = updatedItem;
      } else {
console.log(state.orders.cart)
        state.orders[orderIndex]?.cart?.push(action.payload.order);
      }

console.log(state.orders)

      if (state.orders.length > 0) {
        const amount = state.orders.reduce(
          (acc, curr) =>
            acc +
            curr?.cart?.reduce((subTotal, item) => (subTotal += item.subTotal), 0),
          0
        );
        state.orders[state.orderInView - 1].amount = amount;
        state.totalAmount = amount;
       console.log(amount,JSON.parse(JSON.stringify(state.orders[state.orderInView - 1])))
      } else {
        // Handle the case where there are no orders
        state.totalAmount = 0;
      }     
    },
    setOrderInView: (state, action) => {
      state.orderInView = action.payload;
    },
    setOrderCart: (state, action) => {
      state.orderCart = action.payload;
    },
    handleCountChange:(state,action)=>{

      state.orderCart = state.orderCart?.map((item) => {
        if (item.id === action.payload.newOrder.id) {
          // Update the count when the condition is met
          return {
            ...item,
            count: item.count + 1
          };
        }
        // Return the original item if the condition isn't met
        return item;
      });
      return state
    },
  },
});

export const {
  populateMerchantDetails,
  addOrders,
  addItemsToCart,
  setOrderInView,
  handleCountChange,
  setCategoryNameInView,
  setOrderCart,
} = merchantSlice.actions;
export default merchantSlice.reducer;
