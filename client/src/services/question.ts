import axios from 'axios';
import { BASE_URL } from '../common/constants';
import { AiAnswer, FullQuestion, FullQuestionRequest } from '../common/types/question';


// SOLVE questions
const solveQuestion = async (question: string): Promise<AiAnswer> => {
    const response = await axios.post(
        `${BASE_URL}/question/solve`,
        { question }
    );
    
    return response.data;
};

const getNewAnswer = async (question: string, previousAnswer: string): Promise<AiAnswer> => {
    const response = await axios.post(
        `${BASE_URL}/question/solve/new`,
        { question, previousAnswer }
    );
    
    return response.data.answer;
};

// GET questions
const getAllQuestions = async () => {
    const response = await axios.get(`${BASE_URL}/question/all`);

    return response.data;
};

// CREATE questions
const createQuestion = async (questionRequest: FullQuestionRequest): Promise<FullQuestion> => {
    const response = await axios.post(
        `${BASE_URL}/question/save/one`,
        questionRequest,
    );

    return response.data;
}

export {
    solveQuestion,
    getNewAnswer,
    getAllQuestions,
    createQuestion,
};