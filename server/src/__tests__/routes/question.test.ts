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
    it('should return a list of (non-reading) questions', async () => {
        (prisma.question.findMany as jest.Mock).mockResolvedValue([
            { id: 1, question: 'question text', answers: ['answer 1'], type: 'test' }
        ]);
        (prisma.readingQuestion.findMany as jest.Mock).mockResolvedValue([
            { id: 2, text: 'reading-question text', questions: [
                { id: 1, question: 'question text', answers: ['answer 1'], type: 'test' }
            ]}
        ]);

        const response = await request(app).get('/question/all');

        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(1); // Questions (1) + Reading-questions (0)
        expect(response.body[0]).toEqual(
            expect.objectContaining({
                question: 'question text',
            })
        );
    });

    it('should return 500 if an error occurs', async () => {
        (prisma.question.findMany as jest.Mock).mockRejectedValue(new Error('Prisma error'));

        const response = await request(app).get('/question/all');

        expect(response.status).toBe(500);
        expect(response.body).toEqual({ error: 'Internal server error' });
    });
});

describe('GET /questions/all/reading', () => {
    it('should return a list of reading-questions', async () => {
        (prisma.question.findMany as jest.Mock).mockResolvedValue([
            { id: 1, question: 'question text', answers: ['answer 1'], type: 'test' }
        ]);
        (prisma.readingQuestion.findMany as jest.Mock).mockResolvedValue([
            { id: 2, text: 'reading-question text', questions: [
                { id: 1, question: 'question text', answers: ['answer 1'], type: 'test' }
            ]}
        ]);

        const response = await request(app).get('/question/all/reading');

        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(1); // Questions (1) + Reading-questions (0)
        expect(response.body[0]).toEqual(
            expect.objectContaining({
                text: 'reading-question text',
            })
        );
    });

    it('should return 500 if an error occurs', async () => {
        (prisma.question.findMany as jest.Mock).mockRejectedValue(new Error('Prisma error'));

        const response = await request(app).get('/question/all');

        expect(response.status).toBe(500);
        expect(response.body).toEqual({ error: 'Internal server error' });
    });
});