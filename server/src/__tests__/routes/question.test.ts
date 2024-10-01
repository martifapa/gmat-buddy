import request from 'supertest';
import jwt from 'jsonwebtoken';

import app from '../../app';


jest.mock('jsonwebtoken')
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

describe('GET /question/all', () => {
    const mockToken = 'mockedToken';

    beforeEach(() => {
        jest.clearAllMocks();
        (jwt.verify as jest.Mock).mockReturnValue({ id: 1, username: 'testuser' });
    });

    it('should return 401 if the token is invalid', async () => {
        (jwt.verify as jest.Mock).mockImplementation(() => {
            throw new Error('Token invalid');
        });

        // Make call with invalid token
        const response = await request(app)
            .get('/question/all')
            .set('Authorization', 'Bearer invalidToken');
        
        expect(response.status).toBe(401);
        expect(response.text).toBe('Token invalid');
    });

    it('should return a list of (non-reading) questions', async () => {
        // Mock questions response
        (prisma.question.findMany as jest.Mock).mockResolvedValue([
            { id: 1, question: 'question text', answers: ['answer 1'], type: 'test' }
        ]);
        // Mock reading questions response
        (prisma.readingQuestion.findMany as jest.Mock).mockResolvedValue([
            { id: 2, text: 'reading-question text', questions: [
                { id: 1, question: 'question text', answers: ['answer 1'], type: 'test' }
            ]}
        ]);

        // Simulate authorized request
        const response = await request(app)
            .get('/question/all')
            .set('Authorization', `Bearer ${mockToken}`);

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

        const response = await request(app)
            .get('/question/all')
            .set('Authorization', `Bearer ${mockToken}`);

        expect(response.status).toBe(500);
        expect(response.body).toEqual({ error: 'Internal server error' });
    });
});

describe('GET /question/all/reading', () => {
    const mockToken = 'mockedToken';

    beforeEach(() => {
        jest.clearAllMocks();
        (jwt.verify as jest.Mock).mockReturnValue({ id: 1, username: 'testuser' });
    });

    it('should return a list of reading-questions', async () => {
        (prisma.question.findMany as jest.Mock).mockResolvedValue([
            { id: 1, question: 'question text', answers: ['answer 1'], type: 'test' }
        ]);
        (prisma.readingQuestion.findMany as jest.Mock).mockResolvedValue([
            { id: 2, text: 'reading-question text', questions: [
                { id: 1, question: 'question text', answers: ['answer 1'], type: 'test' }
            ]}
        ]);

        const response = await request(app)
            .get('/question/all/reading')
            .set('Authorization', `Bearer ${mockToken}`);

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

        const response = await request(app)
            .get('/question/all')
            .set('Authorization', `Bearer ${mockToken}`);;

        expect(response.status).toBe(500);
        expect(response.body).toEqual({ error: 'Internal server error' });
    });
});

describe('POST /save/one', () => {
    it('should save a reading question', async () => {

    });

    it('should save a non-reading question', async () => {

    });

    it('should handle malformed questions', async () => {

    });
});

describe('POST /save/list', () => {
    it('should handle wellformed questions', async () => {

    });

    it('should handle malformed questions', async () => {

    });

    it('should handle both wellformed and malformed questions', async () => {

    });
});
