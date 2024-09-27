import axios from 'axios';

import { BASE_URL } from '../common/constants';
import { AiAnswer, FullQuestion, FullQuestionRequest, ReadingQuestion } from '../common/types/question';
import { authHeader } from '../common/utils';


// SOLVE questions
const solveQuestion = async (question: string, questionType: string): Promise<AiAnswer> => {
    const response = await axios.post(
        `${BASE_URL}/question/solve`,
        { question, questionType },
        authHeader(), // add token to headers
    );
    
    return response.data;
};

const getNewAnswer = async (question: string, previousAnswer: string): Promise<AiAnswer> => {
    const response = await axios.post(
        `${BASE_URL}/question/solve/new`,
        { question, previousAnswer },
        authHeader(),
    );
    
    return response.data;
};

// GET questions
const getAllQuestions = async (): Promise<FullQuestion[]> => {
    try {
        const response = await axios.get(
            `${BASE_URL}/question/all`,
            authHeader(),
        );
        
        return response.data;
    } catch (error) {
        console.log(error)
        throw error
    }
};

const getAllReadingQuestions = async (): Promise<ReadingQuestion[]> => {
    const headers = authHeader();
    const response = await axios.get(
        `${BASE_URL}/question/all/reading`,
        headers,
    );

    return response.data;
}

// CREATE questions
const createQuestion = async (questionRequest: FullQuestionRequest): Promise<FullQuestion> => {
    const response = await axios.post(
        `${BASE_URL}/question/save/one`,
        questionRequest,
        authHeader(),
    );

    return response.data;
}

const createQuestionsBulk = async (questions: FullQuestionRequest[]): Promise<FullQuestion[]> => {
    const response = await axios.post(
        `${BASE_URL}/save/list`,
        questions,
        authHeader(),
    );

    return response.data;
}

export {
    solveQuestion,
    getNewAnswer,
    getAllQuestions,
    getAllReadingQuestions,
    createQuestion,
    createQuestionsBulk
};