import express from 'express';
import { getUsers, login, register } from '../controllers/user';
import { auth } from '../common/middleware';
import { findUser } from '../services/user';


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

    const user = await login(username, password);

    if (!user) {
        return response.status(403).json({ error: 'Username not found'}).end();
    }

    return response.json(user).end();
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


export default router;