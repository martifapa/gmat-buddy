export interface Question {
    id: number,
    question: string,
    answers: string[],
    type: string,
    correct: string,
    explanation: string,
    difficulty: string,
}

export interface ReadingQuestion {
    id: number,
    type: string,
    text: string,
    questions: Question[],
}

