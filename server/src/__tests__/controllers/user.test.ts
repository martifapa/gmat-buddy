import jwt from 'jsonwebtoken';

import { login, register, getUsers } from '../../controllers/user';
import { findUser, createUser, getAllUsers } from '../../services/user';
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
    const mockCreateUser = createUser as jest.Mock;

    const validUserRequest = {
        username: 'validUser',
        email: 'valid@user.com',
        password: 'validPassword',
    };

    const invalidUserRequest = {
        username: 'missingFields',
    };

    const validUserResponse = {
        id: 1,
        username: validUserRequest.username,
        email: validUserRequest.email,
        password_hash: 'validPasswordHash',
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should create a valid user', async () => {
        mockCreateUser.mockResolvedValue(validUserResponse);

        const result = await register(validUserRequest);

        expect(mockCreateUser).toHaveBeenCalledWith(validUserRequest);
        expect(result).toBe(true);
    });
    
    it('should handle repeated usernames', async () => {
        mockCreateUser.mockResolvedValueOnce(validUserResponse); // first register successful
        mockCreateUser.mockResolvedValue(false); // next registers unsuccessful

        const validRegister = await register(validUserRequest); // successful mock
        const invalidRegister = await register(validUserRequest);

        expect(validRegister).toBe(true);

        expect(mockCreateUser).toHaveBeenNthCalledWith(2, validUserRequest);
        expect(invalidRegister).toBe(false);
    });

    it('should handle malformed requests', async () => {
        mockCreateUser.mockResolvedValue(null);

        // @ts-ignore
        const invalidRegister = await register(invalidUserRequest); // missing fields

        expect(mockCreateUser).toHaveBeenCalledWith(invalidUserRequest);
        expect(invalidRegister).toBe(false);
    });
});

describe('getUsers', () => {
    const mockGetUsers = getAllUsers as jest.Mock;

    const validUsers = [
        {
            id: 1,
            username: 'validUser1',
            email: 'valid1@user.com',
            password_hash: 'validPassword',
        },
        {
            id: 2,
            username: 'validUser2',
            email: 'valid2@user.com',
            password_hash: 'validPassword',
        }
    ];

    beforeEach(() => {
        jest.clearAllMocks();
        jest.mocked(getAllUsers).mockClear();
    });

    it('should return all existent users', async () => {
        mockGetUsers.mockResolvedValue(validUsers);

        const result = await getUsers();

        expect(mockGetUsers).toHaveBeenCalledTimes(1);
        expect(result).toHaveLength(2);
        expect(result).toEqual(validUsers);
    });

    it('should return 0 users when none exist', async () => {
        mockGetUsers.mockResolvedValue([]);
        
        const result = await getUsers();

        expect(mockGetUsers).toHaveBeenCalledTimes(1);
        expect(result).toHaveLength(0);
    });

    it('should handle errors thrown by getAllUsers', async () => {
        mockGetUsers.mockRejectedValueOnce(new Error('Database error'));

        await expect(getUsers()).rejects.toThrow('Failed to fetch users');
        
        expect(mockGetUsers).toHaveBeenCalledTimes(1);
    });
});