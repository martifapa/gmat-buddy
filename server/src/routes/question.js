"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const question_1 = require("../controllers/question");
const router = express_1.default.Router();
router.post('/question', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { question } = request.body;
    if (!question) {
        return response.status(400).json({ error: 'Question is required' }).end();
    }
    try {
        const answer = yield (0, question_1.solveQuestion)(question);
        response.json({ answer }).end();
    }
    catch (error) {
        console.log(error);
        response.status(500).json({ error: 'Failed to solve question' }).end();
    }
}));
router.post('/question/new', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { question, previousAnswer } = request.body;
    if (!question || !previousAnswer) {
        return response.status(400).json({ error: 'Question and previous answer are required' }).end();
    }
    try {
        const answer = yield (0, question_1.provideDifferentExplanation)(question, previousAnswer);
        response.json({ answer }).end();
    }
    catch (error) {
        console.log(error),
            response.status(500).json({ error: 'Failed to solve question' }).end();
    }
}));
exports.default = router;
