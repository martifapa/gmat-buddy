import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { FullQuestionRequest, QuestionState } from "../../common/types/question";
import { IDLE, LOADING } from "../../common/constants";
import { createQuestion, getAllQuestions } from "../../services/question";


const initialState: QuestionState = {
    status: IDLE,
    questionBank: [],
};

export const fetchQuestions = createAsyncThunk(
    'questions/fetchQuestions',
    async () => {
        const response = await getAllQuestions();
        console.log('THUNK', response)
        return response;
    }
);

export const saveQuestion = createAsyncThunk(
    'questions/saveQuestion',
    async (questionRequest: FullQuestionRequest) => {
        const response = await createQuestion(questionRequest);
        return response;
    }
);


const slice = createSlice({
    name: 'questions',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchQuestions.pending, (state) => {
                state.status = LOADING;
            })
            .addCase(fetchQuestions.fulfilled, (state, action) => {
                state.status = IDLE;
                state.questionBank = action.payload;
            })
            // SAVE question
            .addCase(saveQuestion.pending, (state) => {
                state.status = LOADING;
            })
            .addCase(saveQuestion.fulfilled, (state, action) => {
                state.status = IDLE;
                state.questionBank = [...state.questionBank, action.payload];
            })
    }
});


// export const {  } = slice.actions;

export default slice.reducer;