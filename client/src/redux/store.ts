import { configureStore } from "@reduxjs/toolkit";
import questionSlice from "./slices/question";
import toastSlice from "./slices/toast";


const store = configureStore({
    reducer: {
        questions: questionSlice,
        toast: toastSlice,
    }
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


export default store;