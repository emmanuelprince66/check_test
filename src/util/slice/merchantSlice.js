import { createSlice } from "@reduxjs/toolkit";

const merchantSlice = createSlice({
  name: "merchantDetails",
  initialState: {
    data: [],
    orderCart: [],
    orders: [],
    orderInView: 0,
    categoryNameInView: "",
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
      let itemExists = state.orders.find(
        (item) => item.id === action.payload.id
      );
      if (!itemExists) {
        let addMenuObject = { ...action.payload };
        state.orders.push(addMenuObject);
      }
    },
    addItemsToCart: (state, action) => {
      const orderIndex = state.orders.findIndex(
        (item) => item.id === state.orderInView
      );
      let existingItem = state.orders[orderIndex]?.cart?.find(
        (item) => item.name === action.payload.order.name
      );
      state.orders[orderIndex].menu = state.orders[orderIndex].menu.map((item)=>{
        if(item.id === action.payload.order.id ){
          return {...item,'added':true }

        }
        return item;
      })

      if (existingItem) {
        const updatedItem = { ...existingItem };
        updatedItem.subTotal = action.payload.order.subTotal;

        const itemIndex = state.orders[orderIndex].cart.findIndex(
          (item) => item.name === action.payload.order.name
        );
        state.orders[orderIndex].cart[itemIndex] = updatedItem;
      } else {
        state.orders[orderIndex]?.cart?.push(action.payload.order);
      }

      if (state.orders[orderIndex]?.cart.length > 0) {
        const amount = state.orders.reduce((acc, curr) => {
          const subTotal = curr?.cart?.reduce(
            (subTotal, item) =>{

              return subTotal += item.subTotal
            },
            0
          );
          return acc + subTotal;
        }, 0);

        // Update the amount and totalAmount
        const subTotal = state.orders[orderIndex]?.cart?.reduce(
          (subTotal, item) =>{
            return subTotal += item.subTotal
          },
          0
        );
        console.log(subTotal,JSON.parse(JSON.stringify( state.orders[orderIndex])))
        state.orders[orderIndex] = {...state.orders[orderIndex],amount:subTotal} ;

        state.totalAmount = amount;
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
    addMenu: (state, action) => {
      const orderIndex = state.orders.findIndex(
        (item) => item.id === state.orderInView
      );

      state.orders[orderIndex] = {
        ...state.orders[orderIndex],
        menu: action.payload,
      };

      return state;
    },
    handleCountChange: (state, action) => {
      const orderIndex = state.orders.findIndex(
        (item) => item.id === state.orderInView
      );
      state.orders[orderIndex].menu = state.orders[orderIndex].menu?.map(
        (item) => {
          if (item.id === action.payload.id) {
            // Update the count when the condition is met
            if(action.payload.type === 'add'){
              return {
                ...item,
                count: item.count + 1,
              };
  
            }
            else{
              return {
                ...item,
                count: item.count - 1,
              };

            }
          }
          // Return the original item if the condition isn't met
          return item;
        }
      );
      return state;
    },
    removeOrder: (state, action) => {
      state.orders = state.orders.filter(
        (order) => order.id !== action.payload
      )
.map((item,i)=>{
  return{
    ...item,id:i + 1
  }
})
    },
    clearRestaurantCart: (state, action) => {
      state.orders = state.orders.filter(
        (order) => order.id === 1
      )
    },
    editStatusUpdate: (state, action) => {
      let neil = state.orders[state.orderInView - 1].menu

      state.orders[state.orderInView - 1].menu = state.orders[state.orderInView - 1].menu.map(
(item)=>{
  if(item.id === action.payload){
    return{...item,added:false}
  }
  return item
}
      )
      console.log(JSON.parse(JSON.stringify(neil)))
    },
  },
});

export const {
  populateMerchantDetails,
  addOrders,
  removeOrder,
  addMenu,
  addItemsToCart,
  setOrderInView,
  handleCountChange,
  editStatusUpdate,
  setCategoryNameInView,
  clearRestaurantCart,
  setOrderCart,
} = merchantSlice.actions;
export default merchantSlice.reducer;
