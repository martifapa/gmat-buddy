import request from 'supertest';
import jwt from 'jsonwebtoken';

import app from '../../app';
import { login } from '../../controllers/user';
import { findUser } from '../../services/user';
import { authenticate } from '../../common/utils/user';


jest.mock('../../services/user');
jest.mock('../../common/utils/user');
jest.mock('jsonwebtoken');
jest.mock('../../common/prisma', () => ({
    __esModule: true,
    default: {
        user: {
            findMany: jest.fn(),
            findUnique: jest.fn(),
            create: jest.fn(),
        },
    },
}));

describe('login', () => {
    const mockFindUser = findUser as jest.Mock;
    const mockAuthenticate = authenticate as jest.Mock;
    const mockJwtSign = jwt.sign as jest.Mock;

    const validUser = {
        id: 1,
        username: 'validUser',
        email: 'valid@user.com',
        password_hash: 'validPasswordHash',
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should handle search of non-existent users', async () => {
        mockFindUser.mockResolvedValue(null);

        const result = await login('nonexistentUser', 'password');

        expect(mockFindUser).toHaveBeenCalledWith('nonexistentUser');
        expect(result).toEqual({ error: 'User not found' });
    });

    it('should handle an incorrect password', async () => {
        mockFindUser.mockResolvedValue(validUser);
        mockAuthenticate.mockResolvedValue(false);

        const result = await login('validUser', 'incorrectPassword');

        expect(mockFindUser).toHaveBeenCalledWith('validUser');
        expect(mockAuthenticate).toHaveBeenCalledWith('incorrectPassword', 'validPasswordHash');
        expect(result).toEqual({ error: 'Authentication failed' });
    });

    it('should handle valid credentials', async () => {
        mockFindUser.mockResolvedValue(validUser);
        mockAuthenticate.mockResolvedValue(true);
        mockJwtSign.mockReturnValue('validToken');

        const result = await login('validUser', 'validPassword');

        expect(mockFindUser).toHaveBeenCalledWith('validUser');
        expect(mockAuthenticate).toHaveBeenCalledWith('validPassword', 'validPasswordHash');
        expect(mockJwtSign).toHaveBeenCalledWith(
            { id: validUser.id, username: validUser.username },
            expect.anything(),
            { expiresIn: '30 minutes' }
        );

        expect(result).toEqual({
            user: {
                id: validUser.id,
                username: validUser.username,
            },
            token: 'validToken',
        });
    });

    it('should logout user automatically after X time', async () => {

    });
});

describe('register', () => {
    it('should create a valid user', async () => {

    });

    it('should handle malformed requests', async () => {

    });

    it('should handle repeated usernames', async () => {

    });
});

describe('getUsers', () => {
    it('should return all existent users', async () => {

    });
});