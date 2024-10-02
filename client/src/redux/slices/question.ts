import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { FullQuestionRequest, QuestionState } from "../../common/types/question";
import { IDLE, LOADING } from "../../common/constants";
import { createQuestion, createQuestionsBulk, getAllQuestions } from "../../services/question";


const initialState: QuestionState = {
    status: IDLE,
    questionBank: [],
};

export const fetchQuestions = createAsyncThunk(
    'questions/fetchQuestions',
    async () => {
        const response = await getAllQuestions();
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

export const saveQuestionsBulk = createAsyncThunk(
    'questions/saveQuestionsBulk',
    async (questions: FullQuestionRequest[]) => {
        const response = await createQuestionsBulk(questions);
        return response;
    }
);


const slice = createSlice({
    name: 'questions',
    initialState,
    reducers: {
        saveExplanation(state, action) {
            state.questionBank = state.questionBank.map(question =>
                question.id === action.payload.id
                    ? {
                        ...question,
                        explanations: [...question.explanations, action.payload.explanation],
                        correct: action.payload.answerIdx ? action.payload.answerIdx : null,
                    }
                    : question
            );
        }
    },
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
            // SAVE question(s)
            .addCase(saveQuestionsBulk.pending, (state) => {
                state.status = LOADING;
            })
            .addCase(saveQuestionsBulk.fulfilled, (state, action) => {
                const { questions } = action.payload;
                state.status = IDLE;
                state.questionBank = [...state.questionBank, ...questions];
            })
    }
});


export const { saveExplanation } = slice.actions;

export default slice.reducer;