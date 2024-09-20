import axios from 'axios';
import { BASE_URL } from '../common/constants';
import { AiAnswer } from '../common/types/question';


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

const getAllQuestions = async () => {
    const response = await axios.get(`${BASE_URL}/question/all`);

    return response.data;
};


export {
    solveQuestion,
    getNewAnswer,
    getAllQuestions,
};