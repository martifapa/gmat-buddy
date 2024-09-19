import { getAllQuestions } from "../../controllers/question";


jest.mock('../../common/prisma', () => ({
    __esModule: true,
    default: {
        question: {
            findMany: jest.fn(),
        },
        readingQuestion: {
            findMany: jest.fn(),
        },
    },
}));

import prisma from '../../common/prisma';

describe('getAllQuestions', () => {
    it('should fetch question and reading-questions', async () => {
        (prisma.question.findMany as jest.Mock).mockResolvedValue([{ id: 1, question: 'question text', answers: ['answer 1'] }]);
        (prisma.readingQuestion.findMany as jest.Mock).mockResolvedValue([{ id: 2, text: 'reading-question text', questions: [{ id: 1, question: 'question text', answers: ['answer 1'] }] }]);

        const result = await getAllQuestions();

        expect(result).toHaveLength(2); // Questions (1) +  Reading-questions (1)
    });

    it('should handle empty data', async () => {
        (prisma.question.findMany as jest.Mock).mockResolvedValue([]);
        (prisma.readingQuestion.findMany as jest.Mock).mockResolvedValue([]);

        const result = await getAllQuestions();

        expect(result).toHaveLength(0); // Questions (0) + Reading-questions (0)
    });
});