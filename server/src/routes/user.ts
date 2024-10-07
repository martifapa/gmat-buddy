import express from 'express';

import { getUsers, login, register } from '../controllers/user';
import { auth } from '../common/middleware';
import { findUser } from '../services/user';
import { generateAccessToken } from '../common/utils/utils';
import { validateRefreshToken } from '../common/utils/ddbb';


const router = express.Router();

router.get('/all', auth, async (_request, response) => {
    const users = await getUsers();
    return response.json(users).end();
});

router.post('/', auth, async (request, response) => {
    const { username } = request.body;
    const user = await findUser(username);
    return response.json(user).end();
});

router.post('/login', async (request, response) => {
    const { username, password } = request.body;
    
    if (!username || !password) {
        return response.status(400).json({ error: 'Username and password required '}).end();
    }
    
    const loginResponse = await login(username, password, response);
    
    if (!loginResponse) {
        return response.status(403).json({ error: 'Username not found'}).end();
    }

    return loginResponse;
});

router.post('/logout', (_request, response) => {
    response.clearCookie('refreshToken', {
        httpOnly: true,
        secure: false, // SET TO true ON PRODUCTION ENVIRONMENT
        sameSite: 'strict',
    });

    return response.status(200).json({ message: 'Logged out successfully' });
});

router.post('/register', async (request, response) => {
    const user = request.body;

    if (!user.username || !user.email || !user.password ) {
        return response.status(400).json({ error: 'Missing required fields' }).end();
    }

    try {
        const result = await register(user);
        if (result) {
            return response.json( { user: 'Created successfully' }).end();
        }
        return response.status(400).json({ error: 'User not created' }).end();
    } catch (error) {
        console.log(error);
        return response.status(500).json({ error: 'Internal server error' }).end();
    }
});

router.post('/refresh-token', async (request, response) => {
    const refreshToken = request.cookies.refreshToken;
    
    if (!refreshToken) {
        return response.status(401).json({ error: 'Refresh token missing' }).end();
    }

    const user = await validateRefreshToken(refreshToken);

    if (!user) {
        return response.status(403).json({ error: 'Invalid user or refresh token' }).end();
    }

    // Generate new access token
    const accessToken = generateAccessToken(user);

    return response.json({ token: accessToken }).end();
});


export default router;