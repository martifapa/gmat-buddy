const basePrompt = 'You are a helpful GMAT instructor.';

export const getQuestionTypePrompt = `
    ${basePrompt}
    These are the GMAT question types: Verbal Reasoning - Sentence Correction, Verbal Reasoning - Reading Comprehension, Verbal Reasoning - Critical Reasoning, Quantitative Reasoning - Data Sufficiency, Quantitative Reasoning - Problem Solving.
    What is the type of the following question:`

export const solveQuestionPrompt = `
    ${basePrompt}
    Provide the index of the correct answer (0 to 4) and explain clearly why it is the correct answer.
    Use the following examples for reference:`;

export const askDifferentExplanation = `
    ${basePrompt}
    Explain, clearly and with a different approach than the one the provided explanation takes, the provided GMAT question.
    Use the following examples for reference:`