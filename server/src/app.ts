import express from 'express';
import cors from 'cors';

import questionRouter from './routes/question';
import trainRouter from './routes/training';
import userRouter from './routes/user';
import { auth } from './common/middleware';


const app = express();

app.use(express.json());
app.use(cors());


app.use('/question', auth, questionRouter);
app.use('/train', auth, trainRouter);
app.use('/user', userRouter); 


export default app; // Export app for testing