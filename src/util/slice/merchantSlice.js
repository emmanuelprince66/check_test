import { createSlice } from "@reduxjs/toolkit";

const merchantSlice = createSlice({
  name: "merchantDetails",
  initialState: {
    data: [],
    orderCart: [],
    orders: [],
    userDetails:null,
    deliveryDetails:{},
    previewOrders:[],
    OTDRestaurants:[],
    orderInView: 0,
    categoryNameInView: "",
    totalAmount: 0,
    landmarkCost: 0,
    receiptInView:null,
    takeAwayPrice:0,
    myLocation:{},
    landmarks:null,
    isOTD:false,
    OTDtype:'delivery',
    OTDOrderOnClickId:0,
  },
  reducers: {
    populateMerchantDetails: (state, action) => {
      state.data = action.payload;
    },
    setOTDOrderOnClickId: (state, action) => {
      state.OTDOrderOnClickId = action.payload;
    },
    setLandmarkCost: (state, action) => {
      state.landmarkCost = action.payload;
    },
    setDeliveryDetails: (state, action) => {
      state.deliveryDetails = action.payload;
    },
    setOTDtype: (state, action) => {
      state.OTDtype = action.payload;
      state.orders =  state.orders.map((item)=>{
        return {...item, orderType:action.payload}
      })
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
      let existingItem = state.orders[orderIndex]?.items?.find(
        (item) => item.name === action.payload.order.name
      );
      state.orders[orderIndex].menu = state.orders[orderIndex].menu.map((item)=>{
        if(item.id === action.payload.order.menuId ){
          return {...item,'added':true ,canPreview:true,canEditPreview:true}

        }
        return item;
      })

      if (existingItem) {
        const updatedItem = { ...existingItem };
        updatedItem.subTotal = action.payload.order.subTotal;

        const itemIndex = state.orders[orderIndex].items.findIndex(
          (item) => item.name === action.payload.order.name
        );
        state.orders[orderIndex].items[itemIndex] = updatedItem;
      } else {
        state.orders[orderIndex]?.items?.push(action.payload.order);
      }

      if (state.orders[orderIndex]?.items.length > 0) {
        const amount = state.orders.reduce((acc, curr) => {
          const subTotal = curr?.items?.reduce(
            (subTotal, item) =>{

              return subTotal += item.subTotal
            },
            0
          );
          return acc + subTotal;
        }, 0);

        // Update the amount and totalAmount
        const subTotal = state.orders[orderIndex]?.items?.reduce(
          (subTotal, item) =>{
            return subTotal += item.subTotal
          },
          0
        );
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
    updateOrderType: (state, action) => {
      state.orders[state.orderInView - 1].orderType = action.payload;
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
                subTotal:Number(item.price) * (item.count + 1)
              };
  
            }
            else{
              return {
                ...item,
                count: item.count - 1,
                subTotal:Number(item.price) * (item.count - 1)
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
    return{...item,added:false,canEditPreview:false}
  }
  return item
}
      )
    },
    removeItemFromCart:(state,action)=>{
      state.orders[state.orderInView - 1].items = state.orders[state.orderInView - 1].items.filter((item)=> item.id !== action.payload.id )
      state.orders[state.orderInView - 1].menu = state.orders[state.orderInView - 1].menu.map((item)=> {
        if (item.id === action.payload.id){
          return {
            ...item,count:1, added:false, subTotal:item.price
          }
        }
        return item
      } )

      state.orders[state.orderInView - 1].amount -= action.payload.subTotal
    },
    resetState:(state,action)=>{
       state.orders =  []
        state.orderInView =  0
        state.categoryNameInView = ""
        state.totalAmount = 0
    },

    handlePreview:(state,action)=>{
      state.previewOrders  = state.orders[state.orderInView - 1]?.menu?.filter(item=>item.canPreview)
    },
    showReceiptInView:(state,action)=>{
      state.receiptInView  = action.payload
    },
    fillUserDetails:(state,action)=>{
      state.userDetails  = action.payload
    },
    setTakeAwayPrice:(state,action)=>{
      state.takeAwayPrice  = action.payload
    },
    setLocation:(state,action)=>{
      state.myLocation  = action.payload
    },
    setLandmarks:(state,action)=>{
      state.landmarks  = action.payload
    },
    initOTD:(state,action)=>{
      state.isOTD  = action.payload
    }
,
    setOTDRestaurants:(state,action)=>{
      state.OTDRestaurants  = action.payload
    }

  },
});

export const {
  populateMerchantDetails,
  addOrders,
  fillUserDetails,
  removeOrder,
  setDeliveryDetails,
  showReceiptInView,
  setLandmarkCost,
  setOTDtype,
  addMenu,
  setTakeAwayPrice,
  setLocation,
  initOTD,
  setOTDRestaurants,
  setLandmarks,
  handlePreview,
  setOTDOrderOnClickId,
  addItemsToCart,
  setOrderInView,
  removeItemFromCart,
  handleCountChange,
  editStatusUpdate,
  updateOrderType,
  setCategoryNameInView,
  resetState,
  clearRestaurantCart,
  setOrderCart,
} = merchantSlice.actions;
export default merchantSlice.reducer;
