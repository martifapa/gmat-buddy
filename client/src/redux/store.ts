import { configureStore } from "@reduxjs/toolkit";
import questionSlice from "./slices/question";
import toastSlice from "./slices/toast";
import readingQuestionSlice from "./slices/readingQuestion";


const store = configureStore({
    reducer: {
        questions: questionSlice,
        readingQuestions: readingQuestionSlice,
        toast: toastSlice,
    }
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


export default store;