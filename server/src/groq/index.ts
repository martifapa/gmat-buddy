import { GROQ_API_KEY } from "../config";

const Groq = require('groq-sdk');

const groq = new Groq({
    api_key: GROQ_API_KEY
});


export default groq;