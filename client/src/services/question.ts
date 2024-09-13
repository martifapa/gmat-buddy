import axios from 'axios';
import { BASE_URL } from '../common/constants';


const solveQuestion = async (question: string): Promise<string> => {
    const response = await axios.post(
        `${BASE_URL}/question`,
        { question }
    );
    console.log('SERVICE', response.data)
    return response.data.answer;
};

const getNewAnswer = async (question: string, previousAnswer: string): Promise<string> => {
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