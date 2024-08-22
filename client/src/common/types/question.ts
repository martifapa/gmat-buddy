export interface Question {
    id: number,
    question: string,
    answer?: string,
}

export interface QuestionState {
    status: string,
    questionBank: Question[],
}