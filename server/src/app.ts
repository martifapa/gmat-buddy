import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import questionRouter from './routes/question';
import trainRouter from './routes/training';
import userRouter from './routes/user';
import { auth } from './common/middleware';


const app = express();

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));
app.use(cookieParser());


app.use('/question', auth, questionRouter);
app.use('/train', auth, trainRouter);
app.use('/user', userRouter); 


export default app; // Export app for testing