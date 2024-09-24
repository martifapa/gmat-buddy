import jwt from 'jsonwebtoken';

import { UserRequest } from "../common/types";
import { authenticate } from "../common/utils/user";
import { SECRET_KEY } from "../config";
import { createUser, findUser, getAllUsers } from "../services/user";


export const login = async (username: string, password: string) => {
    const user = await findUser(username);

    if (!user) {
        return { error: 'User not found' };
    }

    const isAuthenticated = await authenticate(password, user.password_hash);
    if (isAuthenticated) {
        const token = jwt.sign(
            {
                id: user.id,
                username: user.username,
            },
            SECRET_KEY,
            {
                expiresIn: '30 minutes',
            }
        );
        return {
            user: {
                id: user.id,
                username: user.username,
            },
            token: token,
        };
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
    return await getAllUsers();
}