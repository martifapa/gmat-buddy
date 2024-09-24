import { createSlice } from "@reduxjs/toolkit";
import { HIDDEN } from "../../common/constants";


const initialState = {
    status: HIDDEN,
    message: '',
    mood: '',
}

const slice = createSlice({
    name: 'toast',
    initialState,
    reducers: {
        setMessage(state, action) {
            const { message, status, mood } = action.payload;
            state.status = status;
            state.message = message;
            state.mood = mood;
        }
    }
});


export const { setMessage } = slice.actions;

export default slice.reducer;