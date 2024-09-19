import express from 'express';
import cors from 'cors';

import questionRouter from './routes/question';
import trainRouter from './routes/training';


const app = express();

app.use(express.json());
app.use(cors());


app.use('/question', questionRouter);
app.use('/train', trainRouter);


export default app; // Export app for testing