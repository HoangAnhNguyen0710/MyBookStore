import { useEffect } from "react";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartDetail {
  bookId: number;
  quantity: number;
  price: number;
  title: string;
  sub_total: number;
}

const getInitialCart = (): CartDetail[] => {
  if (typeof window !== "undefined") {
    return JSON.parse(sessionStorage.getItem("Cart") || "[]");
  }
  return [];
};

const cartSlice = createSlice({
  name: "cart",
  initialState: [] as CartDetail[], // Tránh hydration lỗi bằng cách để mảng rỗng
  reducers: {
    addToCart: (
      state,
      action: PayloadAction<{
        bookId: number;
        quantity: number;
        price: number;
        title: string;
      }>
    ) => {
      const { bookId, quantity, price, title } = action.payload;
      const existingItemIndex = state.findIndex((item) => item.bookId === bookId);

      if (existingItemIndex !== -1) {
        state[existingItemIndex].quantity += quantity;
        if (state[existingItemIndex].quantity === 0) {
          state.splice(existingItemIndex, 1);
        } else {
          state[existingItemIndex].sub_total = state[existingItemIndex].quantity * price;
        }
      } else {
        state.push({
          bookId,
          quantity,
          sub_total: quantity * price,
          price: price,
          title: title,
        });
      }

      sessionStorage.setItem("Cart", JSON.stringify(state));
    },
    clearCart: (state) => {
      state.length = 0;
      sessionStorage.removeItem("Cart");
    },
  },
});

export const { addToCart, clearCart } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;

export function useCartInitializer(setCart: (cart: CartDetail[]) => void) {
  useEffect(() => {
    const cart = getInitialCart();
    setCart(cart);
  }, []);
}
