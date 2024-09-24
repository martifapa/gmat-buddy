import { configureStore } from "@reduxjs/toolkit";
import questionSlice from "./slices/question";
import toastSlice from "./slices/toast";
import readingQuestionSlice from "./slices/readingQuestion";
import authSlice from "./slices/auth";


const store = configureStore({
    reducer: {
        questions: questionSlice,
        readingQuestions: readingQuestionSlice,
        toast: toastSlice,
        auth: authSlice,
    }
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


export default store;