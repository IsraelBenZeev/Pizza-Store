import { createSlice } from '@reduxjs/toolkit';
import { OrderCartType } from '../../types/orderCart';
import { RootState } from '../../utils/store';
type initialStateType = {
  cart: OrderCartType[];
};

const initialState: initialStateType = {
  cart: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      // payload = new item
      state.cart.push(action.payload);
    },
    deleteItem(state, action) {
      console.log('id: ', action.payload);

      // payload = id
      state.cart = state.cart.filter((el) => el.pizzaId !== action.payload);
      return state;
    },
    increaseItemQuantity(state, action) {
      // payload = id
      const item = state.cart.find((el) => el.pizzaId === action.payload);
      if (!item) return;
      item.quantity++;
      item.totalPrice = item.unitPrice * item.quantity;
    },
    decreaseItemQuantity(state, action) {
      // payload = id
      const item = state.cart.find((el) => el.pizzaId === action.payload);
      if (!item) return;
      item.quantity--;
      item.totalPrice = item.unitPrice * item.quantity;
      if (item.quantity === 0) cartSlice.caseReducers.deleteItem(state, action);
    },

    clearCart(state) {
      console.log('enter to clear cart');
      state.cart = [];
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

export const getTotalCartPrice = (state: RootState) => {
  return state.cart.cart.reduce(
    (sum: number, el: OrderCartType) => sum + el.totalPrice,
    0,
  );
};
export const getTotalCartQuantity = (state: RootState) => {
  return state.cart.cart.reduce(
    (sum: number, el: OrderCartType) => sum + el.quantity,
    0,
  );
};
export const getQuantityById = (id: number) => {
  return (state: RootState) => {
    return state.cart.cart.find((el) => el.pizzaId === id)?.quantity ?? 0;
  };
};
