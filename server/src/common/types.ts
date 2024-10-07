import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";


// TRAIN DATA TYPES
export interface TrainQuestion {
    id: number,
    question: string,
    answers: string[],
    type: string,
    correct: number,
    explanation: string,
    difficulty: string,
    readingQuestionId?: number | null,
}

export interface TrainReadingQuestion {
    id: number,
    type: string,
    text: string,
    questions: TrainQuestion[],
}

export interface RequestTrainQuestion {
    question: string,
    answers: string[],
    type: string,
    correct: number,
    explanation: string,
    difficulty: string,
}

export interface RequestTrainReadingQuestion {
    type: string,
    text: string,
    questions: TrainQuestion[],
}

// Union types
export type RequestFullTrainQuestion = RequestTrainQuestion | RequestTrainReadingQuestion;

export type ResponseFullTrainQuestion = TrainQuestion | TrainReadingQuestion;


// 'APP' DATA TYPES
export interface Question {
    id: number,
    question: string,
    type: string,
    answers: string[],
    difficulty?: string,
    readingQuestionId?: number,
    correct?: number,
    explanations: Explanation[],
}

export interface ReadingQuestion {
    id: number,
    text: string,
    questions: Question[],
}


export interface RequestQuestion {
    question: string,
    type: string,
    answers: string[],
    difficulty?: string,
}

export interface RequestReadingQuestion {
    text: string,
    questions: RequestQuestion[],
}

export interface Explanation {
    id: number,
    explanation: string,
    question: Question,
    questionId: number,
}

export interface AIExplanation {
    answerIdx?: number,
    explanation: string,
}

// Union types
export type RequestFullQuestion = RequestQuestion | RequestReadingQuestion;


// USER
interface UserBase {
    email: string,
    username: string,
}

export interface UserRequest extends UserBase {
    password: string,
}

export interface User extends UserBase {
    id: number,
    password_hash: string,
}

export interface CustomRequest extends Request {
    token: string | JwtPayload,
}