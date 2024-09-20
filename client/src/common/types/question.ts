export interface Question {
    id: number,
    question: string,
    answers: string[],
    difficulty?: string,
}

export interface ReadingQuestion {
    id: number,
    text: string,
    questions: Question[],
}

export type FullQuestion = Question | ReadingQuestion;

export interface QuestionState {
    status: string,
    questionBank: FullQuestion[],
}

export interface AiAnswer {
    answerIdx: number,
    explanation: string,
}