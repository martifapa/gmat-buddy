import express from 'express';

import { provideDifferentExplanation, solveQuestion } from '../controllers/question';
import { AIAnswerToObject } from '../common/utils';


const router = express.Router();


router.post('/question', async (request, response) => {
    const { question } = request.body;
    if (!question) {
        return response.status(400).json({ error: 'Question is required' }).end();
    }

    try {
        const answer = await solveQuestion(question);
        const answerObject = AIAnswerToObject(answer);
        
        response.json(answerObject).end();
    } catch (error) {
        console.log(error);
        response.status(500).json({ error: 'Failed to solve question' }).end();
    }
});

router.post('/question/new', async (request, response) => {
    const { question, previousAnswer } = request.body;
    if (!question || !previousAnswer) {
        return response.status(400).json({ error: 'Question and previous answer are required' }).end();
    }

    try {
        const answer = await provideDifferentExplanation(question, previousAnswer);
        response.json({ answer }).end();
    } catch (error) {
        console.log(error),
        response.status(500).json({ error: 'Failed to solve question' }).end();
    }
});


export default router;