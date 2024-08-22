"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.askDifferentExplanation = exports.solveQuestionPrompt = void 0;
const basePrompt = 'You are a helpful GMAT instructor.';
exports.solveQuestionPrompt = `${basePrompt} Answer the following GMAT question and explain the reason why it is the correct answer:`;
exports.askDifferentExplanation = `${basePrompt} Answer the followign GMAT question and provide a different explanation than this:`;
