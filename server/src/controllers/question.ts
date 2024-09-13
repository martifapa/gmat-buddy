import { askDifferentExplanation, getQuestionTypePrompt, solveQuestionPrompt } from "../common/constants";
import { buildPrompt, getTrainingData, promptGroq } from "../common/utils";


const getQuestionType = async (question: string): Promise<string> => {
    const prompt = `${getQuestionTypePrompt} ${question}`;
    return await promptGroq(prompt);
}

const solveQuestion = async (question: string): Promise<string> => {
    const questionType = await getQuestionType(question);
    const trainingData = getTrainingData(questionType); // Get fine-tune data
    const prompt = buildPrompt(solveQuestionPrompt, trainingData, question); //Build prompt
    return await promptGroq(prompt);
};

const provideDifferentExplanation = async (question: string, previousAnswer: string): Promise<string> => {
    const questionType = await getQuestionType(question);
    const trainingData = getTrainingData(questionType); // Get fine-tune data
    const prompt = buildPrompt(askDifferentExplanation, trainingData, question, previousAnswer); //Build prompt
    return await promptGroq(prompt);
}


export {
    solveQuestion,
    provideDifferentExplanation
};