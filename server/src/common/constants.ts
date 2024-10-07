const basePrompt = 'You are a helpful GMAT instructor.';

export const getQuestionTypePrompt = `
    ${basePrompt}
    These are the GMAT question types: Verbal Reasoning - Sentence Correction, Verbal Reasoning - Reading Comprehension, Verbal Reasoning - Critical Reasoning, Quantitative Reasoning - Data Sufficiency, Quantitative Reasoning - Problem Solving.
    What is the type of the provided question?
    Answer with only the question type, nothing more:
    <questionType>`

export const solveQuestionPrompt = `
    ${basePrompt}
    Given the provided question
    (1) provide the index of the correct answer (0 to 4)
    (2) and explain clearly why it is the correct answer.

    Return ONLY a JSON object with open and closing braces ("{}") and with two keys: answerIdx, explanation. Your answer should only provide the JSON object, nothing outside from it. Here is an example of hot NOT TO respond, because it includes something else appart from the JSON object:
    "Here is the answer:
    {
        "answerIdx": 0,
        "explanation": "placeholder explanation"
    }"
    Do not mention the index of any index in your explanation.

    Use the following examples for reference to provide the explanation:`;

export const askDifferentExplanation = `
    ${basePrompt}
    Explain, clearly and with a different approach than the one the provided explanation takes, the provided GMAT question.
    

    Return ONLY a JSON object with open and closing braces ("{}") and with one key: , explanation. Your answer should only provide the JSON object, nothing outside from it. Here is an example of hot NOT TO respond, because it includes something else appart from the JSON object:
    "Here is the answer:
    {
        "explanation": "placeholder explanation"
    }"
    Do not mention the index of any index in your explanation.


    Use the following examples for reference:`

export const TYPE_READING = 'Verbal Reasoning - Reading Comprehension';

export const QUESTION_REQUEST_BASE_FIELDS = ['question', 'answers', 'type'];

export const REFRESH_TOKEN_DAYS = 10;