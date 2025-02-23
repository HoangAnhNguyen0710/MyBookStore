// import { OrderDetail } from "@/api";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartDetail {
  bookId: number;
  quantity: number;
  price: number;
  title: string;
  sub_total: number;
}
const initialCart: CartDetail[] = JSON.parse(
  localStorage.getItem("Cart") || "[]"
);

const cartSlice = createSlice({
  name: "cart",
  initialState: initialCart,
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
      const existingItem = state.find((item) => item.bookId === bookId);

      if (existingItem) {
        existingItem.quantity += quantity;

        // if quantity is negative value (reduce quantity) and become 0 => clear item from cart
        if (existingItem.quantity == 0) {
          state = state.filter((item) => item.bookId !== existingItem.bookId);
        }
        existingItem.sub_total = existingItem.quantity * price;
      } else {
        state.push({
          bookId,
          quantity,
          sub_total: quantity * price,
          price: price,
          title: title,
        });
      }

      localStorage.setItem("Cart", JSON.stringify(state));
    },
    clearCart: (state) => {
      state.length = 0; // Clear all items in cart
      localStorage.removeItem("Cart");
    },
  },
});

export const { addToCart, clearCart } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
