"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config");
const Groq = require('groq-sdk');
const groq = new Groq({
    api_key: config_1.GROQ_API_KEY
});
exports.default = groq;
