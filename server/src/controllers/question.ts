import { askDifferentExplanation, getQuestionTypePrompt, solveQuestionPrompt } from "../common/constants";
import { ResponseFullQuestion } from "../common/types";
import { getTrainingData, buildPrompt, promptGroq } from "../common/utils";
import { getQuestions } from "../common/utils";


// SOLVE-related controllers
const getQuestionType = async (question: string): Promise<string> => {
    const prompt = `${getQuestionTypePrompt}
    Provided question: "${question}"`;
    return await promptGroq(prompt, 0);
};

const solveQuestion = async (question: string): Promise<string> => {
    const questionType = await getQuestionType(question);
    const trainingData = await getTrainingData(questionType); // Get fine-tune data
    const prompt = buildPrompt(solveQuestionPrompt, trainingData, question);

    return await promptGroq(prompt);
};

const provideDifferentExplanation = async (question: string, previousAnswer: string): Promise<string> => {
    const questionType = await getQuestionType(question);
    const trainingData = await getTrainingData(questionType); // Get fine-tune data
    const prompt = buildPrompt(askDifferentExplanation, trainingData, question, previousAnswer);
    return await promptGroq(prompt);
};

// SAVE-related endpoints


// GET-related endpoints
const getAllQuestions = async (): Promise<ResponseFullQuestion[]> => {
    const questions = await getQuestions();
    return questions;
};

export {
    solveQuestion,
    provideDifferentExplanation,
    getAllQuestions,
};