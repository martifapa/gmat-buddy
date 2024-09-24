import { createSlice } from "@reduxjs/toolkit";
import { IDLE } from "../../common/constants";


const initialState = {
    status: IDLE,
    token: '',
}

const slice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        saveToken(state, action) {
            state.token = action.payload;
            console.log('saveToken', state.token)
        },
    },
});


export const { saveToken } = slice.actions;

export default slice.reducer;