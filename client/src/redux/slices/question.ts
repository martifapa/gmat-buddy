import { createSlice } from "@reduxjs/toolkit";
import { QuestionState } from "../../common/types/question";
import { IDLE } from "../../common/constants";


const initialState: QuestionState = {
    status: IDLE,
    questionBank: [
        {
            id: 0,
            question: `Believed to be one of the first widely read female authors of the Western world, Christine de Pizan's masterwork The Book of the City of the Ladies , was written in 1405 and is a history of the Western world from the woman's point-of-view.

                (A) Believed to be one of the first widely read female authors of the Western world
                (B) Written by one of the first widely read female authors of the Western world
                (C) One of the first widely read female authors of the Western world, as some believe
                (D) Written by what some believe as one of the first widely read female authors of the Western world
                (E) Believed by some as one of the first works by a widely read female author in the Western world`
        },
        {
            id: 1,
            question: `One food writer wrote that reducing the amount of animal products in one's diet can contribute to better health and well-being. Based on this claim, some people are completely eliminating meat from their diets in order to be healthier.

                The argument above relies on which of the following assumptions?

                (A) Increasing the amount of vegetables and grains in one's diet can contribute to better health.
                (B) There will be no corresponding increase in the amount of dairy products in the diets of those who are eliminating meat.
                (C) Most food writers believe that some amount of animal products is necessary to a health diet.
                (D) Not all healthy lifestyles require a vegetarian diet.
                (E) Many people who do not eat animal products make decisions for health reasons.`
        }
    ],
};


const slice = createSlice({
    name: 'questions',
    initialState,
    reducers: {
        addQuestion(state, action) {
            const { question } = action.payload;
            const id = Math.max(...state.questionBank.map(q => q.id)) + 1;
            state.questionBank = [...state.questionBank, { id, question }];
        },
    }
});


export const { addQuestion } = slice.actions;

export default slice.reducer;