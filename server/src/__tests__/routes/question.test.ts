import request from 'supertest';
import app from '../../app';


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

describe('GET /questions/all', () => {
    it('should return a list of questions and reading-questions', async () => {
        (prisma.question.findMany as jest.Mock).mockResolvedValue([
            { id: 1, question: 'question text', answers: ['answer 1'] }
        ]);
        (prisma.readingQuestion.findMany as jest.Mock).mockResolvedValue([
            { id: 2, text: 'reading-question text', questions: [
                { id: 1, question: 'question text', answers: ['answer 1'] }
            ]}
        ]);

        const response = await request(app).get('/question/all');

        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(2); // Questions (1) + Reading-questions (1)
    });

    it('should return 500 if an error occurs', async () => {
        (prisma.question.findMany as jest.Mock).mockRejectedValue(new Error('Prisma error'));

        const response = await request(app).get('/question/all');

        expect(response.status).toBe(500);
        expect(response.body).toEqual({ error: 'Internal server error' });
    });
});