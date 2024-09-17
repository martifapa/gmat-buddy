import axios from 'axios';
import { BASE_URL } from '../common/constants';
import { AiAnswer } from '../common/types/question';


const solveQuestion = async (question: string): Promise<AiAnswer> => {
    const response = await axios.post(
        `${BASE_URL}/question`,
        { question }
    );
    
    return response.data;
};

const getNewAnswer = async (question: string, previousAnswer: string): Promise<AiAnswer> => {
    const response = await axios.post(
        `${BASE_URL}/question/new`,
        { question, previousAnswer }
    );
    
    return response.data.answer;
};


export {
    solveQuestion,
    getNewAnswer
}