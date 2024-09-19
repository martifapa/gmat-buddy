import { AIAnswerToObject, parseFullQuestionType } from "../../common/utils";


describe('AIAnswerToObject', () => {
    it('should parse a json string to json', () => {
        const stringifiedJSON = `{
            "answerIdx": 1,
            "explanation": "text explanation."
        }`;

        const result = AIAnswerToObject(stringifiedJSON);
        
        expect(result).toEqual({
            "answerIdx": 1,
            "explanation": "text explanation."
        });
    });

    it('should convert to json when there is a regex match', () => {
        const regexMatch = `{
            "answerIdx": 1,
            "explanation": "text explanation."
        `; // Missing closing bracket

        const result = AIAnswerToObject(regexMatch);

        expect(result).toEqual({
            "answerIdx": 1,
            "explanation": "text explanation."
        });
    });

    it('should return null when no there is no regex match', () => {
        const noRegexMatch = `{
            "answerIdx": 1
        `;

        const result = AIAnswerToObject(noRegexMatch);

        expect(result).toBeNull();
    });
});

describe('parseFullQuestionType', () => {
    it('should return the correct type, when exists', () => {
        const existingType = 'sentence';

        const result = parseFullQuestionType(existingType);

        expect(result).toBeTruthy();
    });

    it('should return undefined when no match type exists', () => {
        const nonExistingType = 'nonesistent';

        const result = parseFullQuestionType(nonExistingType);

        expect(result).toBeUndefined();
    });
});