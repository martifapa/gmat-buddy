import express from 'express';

import { createTrainQuestions } from '../controllers/training';


const router = express.Router();

router.post('/new', async (request, response) => {
    const questions = request.body;
    if (!questions) {
        return response.status(400).json({ error: 'At least one question is mandatory' }).end();
    }

    try {
        const newQuestion = await createTrainQuestions(questions);
        return response.json(newQuestion).end()
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: 'Internat server error' }).end();
    }
});


export default router;