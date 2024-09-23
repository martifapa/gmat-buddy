import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IDLE, LOADING } from "../../common/constants";
import { ReadingQuestionState } from "../../common/types/question";
import { getAllReadingQuestions } from "../../services/question";


const initialState: ReadingQuestionState = {
    status: IDLE,
    questions: [],
}

export const fetchReadingQuestions = createAsyncThunk(
    'readingQuestions/fetchReadingQuestions',
    async () => {
        const response = await getAllReadingQuestions();
        return response;
    }
);

const slice = createSlice({
    name: 'readingQuestions',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchReadingQuestions.pending, (state) => {
                state.status = LOADING;
            })
            .addCase(fetchReadingQuestions.fulfilled, (state, action) => {
                state.status = IDLE;
                state.questions = action.payload;
            })
    },
});


export default slice.reducer;