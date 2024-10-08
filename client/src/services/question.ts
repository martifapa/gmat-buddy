import axiosInstance from './axiosInstance';
import { BASE_URL } from '../common/constants';
import { AiAnswer, BulkQuestionsResponse, FullQuestion, FullQuestionRequest, ReadingQuestion } from '../common/types/question';


// SOLVE questions
const solveQuestion = async (questionId: number, question: string, questionType: string): Promise<AiAnswer> => {
    const response = await axiosInstance.post(
        `${BASE_URL}/question/solve`,
        { questionId, question, questionType },
    );
    
    return response.data;
};

const getNewAnswer = async (questionId: number, question: string, previousAnswer: string): Promise<AiAnswer> => {
    const response = await axiosInstance.post(
        `${BASE_URL}/question/solve/new`,
        { questionId, question, previousAnswer },
    );
    
    return response.data;
};

// GET questions
const getAllQuestions = async (): Promise<FullQuestion[]> => {
    try {
        const response = await axiosInstance.get(
            `${BASE_URL}/question/all`,
        );
        
        return response.data;
    } catch (error) {
        console.log(error)
        throw error
    }
};

const getAllReadingQuestions = async (): Promise<ReadingQuestion[]> => {
    const response = await axiosInstance.get(
        `${BASE_URL}/question/all/reading`,
    );

    return response.data;
}

// CREATE questions
const createQuestion = async (questionRequest: FullQuestionRequest): Promise<FullQuestion> => {
    const response = await axiosInstance.post(
        `${BASE_URL}/question/save/one`,
        questionRequest,
    );

    return response.data;
}

const createQuestionsBulk = async (questions: FullQuestionRequest[]): Promise<BulkQuestionsResponse> => {
    const response = await axiosInstance.post(
        `${BASE_URL}/question/save/list`,
        questions,
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