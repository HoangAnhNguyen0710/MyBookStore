import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ICartState {
   items: unknown[]
}

const initialState: ICartState = {
    items: [],
};

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        setCart: (state, action: PayloadAction<unknown[]>) => {
            state.items = action.payload;
        }
    }
});

export const { setCart } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
