import { configureStore, createSlice } from '@reduxjs/toolkit';
import userSlice from '../features/user/userSlice';
import cartSlice from '../features/cart/cartSlice';

const store = configureStore({
  reducer: {
    user: userSlice,
    cart: cartSlice,
  },
});
console.log('store: ', store);
export default store;
export type RootState = ReturnType<typeof store.getState>;
