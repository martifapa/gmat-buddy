import { QUESTION_REQUEST_BASE_FIELDS, TYPE_READING } from "../constants";
import prisma from "../prisma";
import { Question, ReadingQuestion, RequestFullQuestion, TrainQuestion, TrainReadingQuestion } from "../types";
import { parseFullQuestionType } from "./utils";


export const getTrainingData = async (type: string): Promise<TrainQuestion[] | TrainReadingQuestion[]> => {
    const questionType = parseFullQuestionType(type);

    if (questionType === TYPE_READING) { // ReadingQuestion type
        const trainingData = await prisma.trainReadingQuestion.findMany({
            where: { type: TYPE_READING },
            include: { questions: true },
        });
        return trainingData as TrainReadingQuestion[];
    } else {
        const trainingData = await prisma.trainQuestion.findMany({
            where: {
                type: questionType,
            },
        });
        return trainingData;
    }
};

export const getQuestions = async () => {
    const questions = await prisma.question.findMany({
        include: {
            explanations: true,
        },
    });
    return questions as Question[];
};

export const getReadingQuestions = async () => {
    const readingQuestions = await prisma.readingQuestion.findMany({
        include: { questions: true }, // Include 'inner'-questions
    });
    return readingQuestions as ReadingQuestion[];
}

export const createQuestion = async (question: RequestFullQuestion) => {
    if ('text' in question) {
        const newQuestion = await prisma.readingQuestion.create({
            data: {
                text: question.text,
                questions: {
                    create: question.questions.map(q => ({
                        question: q.question,
                        answers: q.answers,
                        difficulty: q.difficulty,
                        type: q.type,
                    })),
                },
            },
            include: { questions: true },
        });

        return newQuestion;
    } else {
        const newQuestion = await prisma.question.create({
            data: question,
        });
        
        return newQuestion;
    }
};

export const createQuestionsBulk = async (questions: RequestFullQuestion[]) => {
    const newQuestions = [];
    const errorQuestions = [];
    for (const question of questions) {
        // Reading question
        if ('text' in question) {
            const newQuestion = await createQuestion(question);
            newQuestions.push(newQuestion);
        // Ensure all required field are present
        } else if (QUESTION_REQUEST_BASE_FIELDS.every(field => Object.keys(question).includes(field))) {
            const newQuestion = await createQuestion(question);
            newQuestions.push(newQuestion);
        } else {
            errorQuestions.push(question);
        }
    }

    return {
        questions: newQuestions,
        errors: errorQuestions,
    };
};

export const saveCorrectAnswerIdx = async (id: number, idx: number) => {
    try {
        return await prisma.question.update({
            where: { id },
            data: { correct: idx },
        });
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const saveExplanation = async (questionId: number, explanation: string) => {
    try {
        return await prisma.explanation.create({
            data: {
                explanation,
                questionId,
            },
        });
    } catch (error) {
        console.log(error);
        return null;
    }
};

export const saveRefreshToken = async (id: number, refreshToken: string, expiryDate: Date) => {
    try {
        return await prisma.user.update({
            where: { id },
            data: {
                refresh_token: refreshToken,
                expiry_date: expiryDate,
            },
        });
    } catch (error) {
        console.log(error);
        return null;
    }
};

export const validateRefreshToken = async (refreshToken: string) => {
    try {
        const user = await prisma.user.findFirst({
            where: {
                refresh_token: refreshToken,
                expiry_date: {
                    gte: new Date,
                },
            },
        });

        if (user) {
            return user;
        }

        return null;
    } catch (error) {
        console.log(error);
        return null;
    }
}