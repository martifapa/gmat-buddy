import express from 'express';
import cors from 'cors';

import { PORT } from './config';
import questionRouter from './routes/question';


const app = express();

app.use(express.json());
app.use(cors());


app.use(questionRouter);


app.listen(PORT, () => {
    console.log('Server running on port', PORT);
});