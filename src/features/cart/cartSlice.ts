import { createSlice } from '@reduxjs/toolkit';
import { OrderCartType } from '../../types/orderCart';
import { RootState } from '../../utils/store';

const initialState: OrderCartType[] = [];
// cart: [
//   {
//     pizzaId: 6,
//     name: 'Vegetale',
//     quantity: 1,
//     unitPrice: 13,
//     totalPrice: 13,
//   },
// ],
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      // payload = new item
      state.push(action.payload);
    },
    deleteItem(state, action) {
      // payload = id
      state = state.filter((el) => el.pizzaId !== action.payload);
    },
    increaseItemQuantity(state, action) {
      // payload = id
      const item = state.find((el) => el.pizzaId === action.payload);
      if (!item) return;
      item.quantity++;
      item.totalPrice = item.unitPrice * item.quantity;
    },
    decreaseItemQuantity(state, action) {
      // payload = id
      const item = state.find((el) => el.pizzaId === action.payload);
      if (!item) return;
      item.quantity--;
      item.totalPrice = item.unitPrice * item.quantity;
    },

    clearCart(state, action) {
      state = [];
    },
  },
});

export const {
  addItem,
  deleteItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
// export const getTotalCartPrice = (state: OrderCartType[]) => {
//   return state.reduce(
//     (sum: number, el: OrderCartType) => sum + el.totalPrice,
//     0,
//   );
// };
// export const getTotalCartQuantity = (state: OrderCartType[]) => {
//   return state.reduce((sum: number, el: OrderCartType) => sum + el.quantity, 0);
// };
export const getTotalCartPrice = (state:RootState) => {
   return state.cart.reduce((sum: number, el: OrderCartType) => sum + el.totalPrice, 0);
};
export const getTotalCartQuantity = (state: RootState) => {
  return state.cart.reduce((sum: number, el: OrderCartType) => sum + el.quantity, 0);
};
