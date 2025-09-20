import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: [],
  reducers: {
    addProductToCart: (state, action) => {
      state.push({ ...action.payload, quantity: 1 });
    },
    removeCart: (state, action) => {
      return state.filter((item) => item.id !== action.payload.id);
    },
    increase: (state, action) => {
      const item = state.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity += 1;
      }
    },
    decrease: (state, action) => {
      const item = state.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity -= 1;
      }
    },
  },
});
export const { addProductToCart, removeCart, increase, decrease } =
  productSlice.actions;
export default productSlice.reducer;
