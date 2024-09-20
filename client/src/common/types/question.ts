// FULL TYPES / RESPONSES
export interface BaseQuestion {
    id: number,
    question: string,
    type: string,
    answers: string[],
    difficulty?: string,
}

export interface Question extends BaseQuestion {
    readingQuestionId: number,
}

export interface QuestionWithReadingId extends BaseQuestion {
    readingQuestionId: number,
}

export interface ReadingQuestion {
    id: number,
    text: string,
    questions: QuestionWithReadingId[],
}

export type FullQuestion = Question | ReadingQuestion;

export interface QuestionState {
    status: string,
    questionBank: FullQuestion[],
}


// AI RESPONSS
export interface AiAnswer {
    answerIdx: number,
    explanation: string,
}


// REQUESTS
export interface BaseQuestionRequest {
    question: string,
    type: string,
    answers: string[],
    difficulty?: string,
}

export interface QuestionRequest extends BaseQuestionRequest {
    readingQuestionId: null,
}

export interface QuestionWitReadingIdRequest extends BaseQuestionRequest {
    readingQuestionId: number,
}

export interface ReadingQuestionRequest {
    text: string,
    questions: QuestionWitReadingIdRequest[],
}

export type FullQuestionRequest = QuestionRequest | ReadingQuestionRequest;