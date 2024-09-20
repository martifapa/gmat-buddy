import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { QuestionState } from "../../common/types/question";
import { IDLE, LOADING } from "../../common/constants";
import { getAllQuestions } from "../../services/question";


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

const slice = createSlice({
    name: 'questions',
    initialState,
    reducers: {
        addQuestion(state, action) {
            const { question, answers, type, correct, explanation, difficulty } = action.payload;
            const id = Math.max(...state.questionBank.map(q => q.id)) + 1;
            const newQuestion = { // With default empties
                id,
                question,
                answers: answers || [],
                type: type || "",
                correct: correct || "",
                explanation: explanation || "",
                difficulty: difficulty || ""
            }
            state.questionBank = [...state.questionBank, newQuestion];
        },
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
    }
});


export const { addQuestion } = slice.actions;

export default slice.reducer;