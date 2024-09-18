import prisma from "../common/prisma";
import { TrainQuestion, RequestTrainQuestion, ResponseFullTrainQuestion, RequestFullTrainQuestion } from "../common/types";


export const createTrainQuestion = async (question: RequestTrainQuestion): Promise<TrainQuestion> => {
    const newQuestion = await prisma.trainQuestion.create({
        data: { ...question },
    });
    
    return newQuestion;
}

export const createTrainQuestions = async (questions: RequestFullTrainQuestion[]): Promise<ResponseFullTrainQuestion[]> => {
    const newQuestions = [];

    for (const question of questions) {
        if ('text' in question) {
            const newReadingQuestion = await prisma.trainReadingQuestion.create({
                data: {
                    type: question.type,
                    text: question.text,
                    questions: {
                        create: question.questions,
                    },                
                },
                include: {
                    questions: true, // Include the related questions in the result
                }
            });
            newQuestions.push(newReadingQuestion);
        } else {
            const newQuestion = await prisma.trainQuestion.create({
                data: question,
            });
            newQuestions.push(newQuestion);
        }
    }

    return newQuestions;
}