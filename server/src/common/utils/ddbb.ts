import { text } from "stream/consumers";
import { QUESTION_REQUEST_BASE_FIELDS, TYPE_READING } from "../constants";
import prisma from "../prisma";
import { ReadingQuestion, RequestFullQuestion, RequestReadingQuestion, TrainQuestion, TrainReadingQuestion } from "../types";


export const getTrainingData = async (type: string): Promise<TrainQuestion[] | TrainReadingQuestion[]> => {
    if (TYPE_READING.includes(type.toLowerCase())) { // ReadingQuestion type
        const trainingData = await prisma.trainReadingQuestion.findMany({
            where: { type: TYPE_READING },
            include: { questions: true },
        });
        return trainingData as TrainReadingQuestion[];
    } else {
        const trainingData = await prisma.trainQuestion.findMany({
            where: {
                type: {
                    contains: type,
                },
            },
        });
        return trainingData;
    }
};

export const getAllQuestions = async () => {
    const questions = await prisma.question.findMany({
        where: {
            readingQuestionId: null, // Exclude reading type questions
        },
    });

    const readingQuestions = await prisma.readingQuestion.findMany({
        include: { questions: true }, // Include questions excluded earlier
    });

    return [...questions, ...readingQuestions];
};

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
}
