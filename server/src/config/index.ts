require('dotenv').config();


const { PORT, GROQ_API_KEY, SECRET_KEY='default_SECRET_KEY' } = process.env;

if (SECRET_KEY === 'default_SECRET_KEY') {
    throw new Error('SECRET_KEY is not defined');
}


export { PORT, GROQ_API_KEY, SECRET_KEY };