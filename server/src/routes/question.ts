import express from 'express';

import { provideDifferentExplanation, solveQuestion, getAllQuestions, getAllReadingQuestions, addExplanation } from '../controllers/question';
import { AIAnswerToObject, createQuestion, createQuestionsBulk } from '../common/utils';
import { QUESTION_REQUEST_BASE_FIELDS } from '../common/constants';


const router = express.Router();

// SOLVE-related endpoints
router.post('/solve', async (request, response) => {
    const { questionId, question, questionType } = request.body;
    
    if (!question) {
        return response.status(400).json({ error: 'Question is required' }).end();
    }

    try {
        const answer = await solveQuestion(question, questionType);
        const answerObject = AIAnswerToObject(answer);
        
        await addExplanation(questionId, answerObject);
        
        response.json(answerObject).end();
    } catch (error) {
        console.log(error);
        return response.status(500).json({ error: 'Failed to solve question' }).end();
    }
});

router.post('/solve/new', async (request, response) => {
    const { questionId, question, previousAnswer } = request.body;

    if (!question || !previousAnswer) {
        return response.status(400).json({ error: 'Question and previous answer are required' }).end();
    }

    try {
        const explanation = await provideDifferentExplanation(question, previousAnswer);
        const explanationObject = AIAnswerToObject(explanation);

        await addExplanation(questionId, explanationObject);

        return response.json(explanationObject).end();
    } catch (error) {
        console.log(error),
        response.status(500).json({ error: 'Failed to solve question' }).end();
    }
});

// SAVE-related endpoints
router.post('/save/one', async (request, response) => {
    const question = request.body;

    // Reading question
    if ('text' in question) {
        const newQuestion = await createQuestion(question);
        return response.json(newQuestion).end();
    // Not a reading question - Ensure all required fields are present
    } else if (QUESTION_REQUEST_BASE_FIELDS.every(field => Object.keys(question).includes(field))) {
        const newQuestion = await createQuestion(question);
        return response.json(newQuestion).end();
    } else {
        return response.status(400).json({ error: '"question", "answers", and "type" fields are mandaory' }).end();
    }
});

router.post('/save/list', async (request, response) => {
    const questions = request.body;

    if (!Array.isArray(questions)) {
        return response.status(400).json({ error: '"questions" should be an array' }).end();
    }

    const newQuestions = await createQuestionsBulk(questions);
    return response.json(newQuestions).end();
});

// GET-related endpoints
router.get('/all', async (_request, response) => {
    try {
        const questions = await getAllQuestions();
        return response.json(questions).end();
    } catch (error) {
        console.log(error);
        return response.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/all/reading', async (_request, response) => {
    try {
        const readingQuestions = await getAllReadingQuestions();
        return response.json(readingQuestions).end();
    } catch (error) {
        console.log(error);
        return response.status(500).json({ error: 'Internal server error' });
    }
});


export default router;