import { createSlice } from "@reduxjs/toolkit";
import { IDLE } from "../../common/constants";


const initialState = {
    status: IDLE,
    token: '',
    isAuthenticated: false,
}

const slice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        saveToken(state, action) {
            state.token = action.payload;
            state.isAuthenticated = true;
        },
        logout(state) {
            state.token = '';
            state.isAuthenticated = false;
        }
    },
});


export const { saveToken, logout } = slice.actions;

export default slice.reducer;