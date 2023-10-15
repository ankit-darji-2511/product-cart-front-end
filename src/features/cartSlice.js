import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  cart: [],
  totalQuantity: 0,
  totalPrice: 0,
};

export const fetchData = createAsyncThunk('fetchData', async () => {
  try {
    let user_id = localStorage.getItem("loginUserId");
    const apiUrl = "http://127.0.0.1:5141/api/getUserWiseCartItemList";

    let response = await axios.post(apiUrl, { user_id: user_id }).catch((error) => console.log("Error fetching Item : ", error));
    if (response.data.status === 200) {
      return response.data.result
    }
    else {
      return [];
    }
  } catch (error) {
    // Handle errors here
    throw error;
  }
});

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {

    updateCart: (state, action) => {
      try {
        if (action.payload.paymentUpdate == true) {
          state.cart = [];
          state.totalQuantity = 0;
          state.totalPrice = 0;
        }
        else{
          state.totalQuantity = state.totalQuantity + parseInt(action.payload.updateCount)
        }
        
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    },

    initialUpdateCart: (state, action) => {
      try {
        state.totalQuantity = action.payload;
      } catch (error) {
        console.error("Error Initial Update Cart:", error);
      }
    },

    setCartVaue: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
    }
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = 'pending';
        state.cart = [];
        state.totalQuantity = 0;
        state.totalPrice = 0;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = 'idle';
        state.cart = action.payload.itemData;
        state.totalQuantity = action.payload.itemCountData[0].total_item_qty;
        state.totalPrice = action.payload.itemCountData[0].total_item_price;

      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = 'idle';
        state.error = action.error.message;
      });
  },
});

export const {
  updateCart,
  removeItem,
  addQty,
  removeQty,
  initialUpdateCart,
} = cartSlice.actions;

export default cartSlice.reducer;
