import { addDays } from 'date-fns';
import { Response } from 'express';

import { UserRequest } from "../common/types";
import { authenticate } from "../common/utils/user";
import { createUser, findUser, getAllUsers } from "../services/user";
import { generateAccessToken, generateRefreshToken } from '../common/utils/utils';
import { saveRefreshToken } from '../common/utils/ddbb';
import { REFRESH_TOKEN_DAYS } from '../common/constants';


export const login = async (username: string, password: string, response: Response) => {
    const user = await findUser(username);

    if (!user) {
        return { error: 'User not found' };
    }

    const isAuthenticated = await authenticate(password, user.password_hash);
    if (isAuthenticated) {
        const accessToken = generateAccessToken(user);

        const refreshToken = generateRefreshToken();
        const refreshTokenExpiry = addDays(new Date(), REFRESH_TOKEN_DAYS);

        // Save refresh token and expiry date to DDBB
        await saveRefreshToken(user.id, refreshToken, refreshTokenExpiry);

        // Set refresh token in an HTTP-only cookie
        response.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: false,      // SET TO true ON PRODUCTION ENVIRONMENT
            sameSite: 'lax',    // SET TO strict ON PRODUCTION ENVIRONMENT
            expires: refreshTokenExpiry,
        });

        return response.json({
            user: {
                id: user.id,
                username: user.username,
            },
            token: accessToken,
        }).end();
    } else {
        return { error: 'Authentication failed' };
    }
};

export const register = async (user: UserRequest): Promise<boolean> => {
    const newUser = await createUser(user);

    if (!newUser) {
        // handle user not created
        return false;
    }

    return true;
}

export const getUsers = async () => {
    try {
        return await getAllUsers();
    } catch (error) {
        throw new Error('Failed to fetch users');
    }
}