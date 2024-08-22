"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GROQ_API_KEY = exports.PORT = void 0;
require('dotenv').config();
const { PORT, GROQ_API_KEY } = process.env;
exports.PORT = PORT;
exports.GROQ_API_KEY = GROQ_API_KEY;
