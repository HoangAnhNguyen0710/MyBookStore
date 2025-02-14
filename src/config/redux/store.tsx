import { cartReducer } from "@/contexts/cartSlice";
import { userReducer } from "@/contexts/userSlice";
import { configureStore } from "@reduxjs/toolkit";


export const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
