import { askDifferentExplanation, solveQuestionPrompt } from "../common/constants";
import { promptGroq } from "../common/utils";



const solveQuestion = async (question: string): Promise<string> => {
    const prompt = `${solveQuestionPrompt} ${question}`; //Build prompt
    return await promptGroq(prompt);
};

const provideDifferentExplanation = async (question: string, previousAnswer: string): Promise<string> => {
    const prompt = `${askDifferentExplanation} Question: ${question}; Explanation: ${previousAnswer}`; //Build prompt
    return await promptGroq(prompt);
}


export {
    solveQuestion,
    provideDifferentExplanation
};