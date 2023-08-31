import { createSlice } from "@reduxjs/toolkit";

const merchantSlice = createSlice({
  name: "merchantDetails",
  initialState: {
    data:[]
  }
  ,
  reducers: {
    populateMerchantDetails: (state, action) => {
      state.data  = action.payload;
    console.log(action.payload,'layisade')

    },
  },
});

export const {
populateMerchantDetails} = merchantSlice.actions;
export default merchantSlice.reducer;
