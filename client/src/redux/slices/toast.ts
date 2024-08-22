import { createSlice } from "@reduxjs/toolkit";
import { HIDDEN } from "../../common/constants";


const initialState = {
    status: HIDDEN,
    message: 'test',
}

const slice = createSlice({
    name: 'toast',
    initialState,
    reducers: {
        setMessage(state, action) {
            const { message, status } = action.payload;
            state.status = status;
            state.message = message;
        }
    }
});


export const { setMessage } = slice.actions;

export default slice.reducer;