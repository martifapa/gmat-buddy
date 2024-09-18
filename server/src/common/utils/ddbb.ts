import { TYPE_READING } from "../constants";
import prisma from "../prisma";
import { TrainQuestion, TrainReadingQuestion } from "../types";


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