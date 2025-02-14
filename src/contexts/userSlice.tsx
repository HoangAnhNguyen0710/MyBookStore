import { UserBasicInfor } from "@/api";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IUserState {
   value: UserBasicInfor | null;
}

const initialState: IUserState = {
    value: null,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserBasicInfor | null>) => {
            state.value = action.payload;
        }
    }
});

export const { setUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
