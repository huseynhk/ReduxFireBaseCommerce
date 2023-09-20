import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  basket: [],
  totalAmount: 0,
  amount: 0,
  totalPrice: 0,
  filteredBasket: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const isExist = state.basket.find((pr) => pr.id === action.payload.id);
      if (isExist) {
        isExist.amount++;
        isExist.totalAmount++;
        isExist.totalPrice += isExist.price;
        state.totalAmount++;
        state.totalPrice += action.payload.price;
      } else {
        state.basket.push(action.payload);
        state.totalAmount++;
        state.totalPrice += action.payload.price;
      }
    },

    deleteFromCart: (state, action) => {
      const isExist = state.basket.find((pr) => pr.id === action.payload.id);
      if (isExist) {
        state.basket = state.basket.filter(
          (product) => product.id !== action.payload.id
        );
        state.totalAmount -= isExist.amount;
        state.totalPrice -= isExist.totalPrice;
      }
    },

    increament: (state, action) => {
      const findIndex = state.basket.find(
        (product) => product.id === action.payload.id
      );
      if (findIndex && findIndex.amount <= findIndex.stock) {
        findIndex.amount++;
        findIndex.totalAmount++;
        findIndex.totalPrice += findIndex.price;
        state.totalAmount++;
        state.totalPrice += findIndex.price;
        findIndex.stock--;
      }
    },

    decrement: (state, action) => {
      const findIndex = state.basket.find(
        (product) => product.id === action.payload.id
      );
      if (findIndex && findIndex.amount > 1) {
        findIndex.amount--;
        findIndex.totalAmount--;
        findIndex.totalPrice -= findIndex.price;
        state.totalAmount--;
        state.totalPrice -= findIndex.price;
        findIndex.stock++;
      }
    },

    // applyDiscountPrice: (state, action) => {
    //   state.basket.forEach((product) => {product.price *= (1 - action.payload)});
    // },

    applyDiscountPrice: (state, action) => {
      const totalDiscount = state.basket.reduce((discount, product) => {
        const discountedPrice = product.price * (1 - action.payload);
        const discountAmount = product.price - discountedPrice;
        return discount + discountAmount;
      }, 0);

      state.basket.forEach((product) => {
        product.price = Math.round(product.price * (1 - action.payload));
      });

      state.totalPrice = Math.round(state.totalPrice - totalDiscount);
    },
  },
});

export const {
  addToCart,
  deleteFromCart,
  increament,
  decrement,
  applyDiscountPrice,
} = cartSlice.actions;
export default cartSlice.reducer;
