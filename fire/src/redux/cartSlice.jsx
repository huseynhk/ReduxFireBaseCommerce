import { createSlice } from "@reduxjs/toolkit";

const initialState = []

const cartSlice = createSlice({
 name: 'cart',
 initialState,
 reducers:{
    addToCart: (state, action) => {
        state.push(action.payload)
    },
    deleteFromCart: (state, action) => {
        return state =  state.filter((product) => product.id != action.payload.id)
    }
 }
})

export const {addToCart, deleteFromCart} = cartSlice.actions
export default cartSlice.reducer