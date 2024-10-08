import { BulkQuestionsResponse } from "./types/question";


// UI
export const setClassNames = (id: number, selected: number, correct: number ) => {
    if (correct !== -1) { // Question already solved
        if (correct === id) {
            return 'correct';
        } else if (correct !== id && id === selected) {
            return 'incorrect';
        }
    } else { // Question not solved yet
        if (id === selected) {
            return 'selected';
        }
    }
    return ''; // No class applies
};


// UTILS
export const toCamelCase = (text: string) => {
    // [-_\s]+ one or more occurrences of "-", "_" or whitespace
    // (.)? one or zero characters following the previous pattern
    return text
        .replace(/[-_\s]+(.)?/g, (_, c) => c ? c.toUpperCase() : '')
        .replace(/^./, str => str.toLowerCase());
};


// TYPES
export const isBulkQuestionsResponse = (payload: any): payload is BulkQuestionsResponse => {
    return payload && Array.isArray(payload.questions) && Array.isArray(payload.errors);
}