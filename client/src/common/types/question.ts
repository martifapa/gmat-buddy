export interface Question {
    id: number,
    question: string,
    answers: string[],
    type: string,
    correct: string,
    explanation: string,
    difficulty: string,
}

export interface QuestionState {
    status: string,
    questionBank: Question[],
}