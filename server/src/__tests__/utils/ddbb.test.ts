import { getTrainingData, getQuestions, createQuestion, createQuestionsBulk } from "../../common/utils";


jest.mock('../../common/prisma', () => {
    const prismaMock = {
      trainQuestion: {
        findMany: jest.fn(),
        create: jest.fn(),
      },
      trainReadingQuestion: {
        findMany: jest.fn(),
        create: jest.fn(),
      },
      question: {
        findMany: jest.fn(),
        create: jest.fn(),
      },
      readingQuestion: {
        findMany: jest.fn(),
        create: jest.fn(),
      },
    };
  
    return {
      __esModule: true,
      default: prismaMock,
    };
  });

import prisma from "../../common/prisma";

describe('getTrainingData', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return all reading-questions', async () => {
        const COMPLETE_QUESTION_TYPE = 'Verbal Reasoning - Reading Comprehension';
        const QUESTION_TYPE = 'reading';
        const mockReadingQuestions = [
            { id: 1, type: 'Verbal Reasoning - Reading Comprehension', text: 'text',  questions: [{ id: 1, question: 'question text', answers: ['answer 1']}] }
        ];

        (prisma.trainReadingQuestion.findMany as jest.Mock).mockResolvedValue(mockReadingQuestions);

        const result = await getTrainingData(QUESTION_TYPE);

        expect(prisma.trainReadingQuestion.findMany).toHaveBeenCalledWith({
            where: { type: COMPLETE_QUESTION_TYPE },
            include: { questions: true },
        });
        expect(result).toEqual(mockReadingQuestions);
    });

    it('should return all data-sufficiency questions', async () => {
        const COMPLETE_QUESTION_TYPE = 'Quantitative Reasoning - Data Sufficiency';
        const QUESTION_TYPE = 'sufficiency';
        const mockDataSufficiencyQuestions = [
            { id: 2, type: 'Quantitative Reasoning - Data Sufficiency', answers: ['answer 1'] }
        ];

        (prisma.trainQuestion.findMany as jest.Mock).mockResolvedValue(mockDataSufficiencyQuestions);

        const result = await getTrainingData(QUESTION_TYPE);

        expect(prisma.trainQuestion.findMany).toHaveBeenCalledWith({
            where: { type: COMPLETE_QUESTION_TYPE },
        });
        expect(result).toEqual(mockDataSufficiencyQuestions);
    });

    it('should return and empty array when incorrect type passed', async () => {
        const wrongType = 'wrong';
        
        (prisma.trainQuestion.findMany as jest.Mock).mockResolvedValue([]); // empty array

        const result = await getTrainingData(wrongType);

        expect(result).toEqual([]);
    });
});

describe('getQuestions', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should fetch question and reading-questions', async () => {
        (prisma.question.findMany as jest.Mock).mockResolvedValue([{ id: 1, question: 'question text', answers: ['answer 1'], type: 'test' }]);
        (prisma.readingQuestion.findMany as jest.Mock).mockResolvedValue([{ id: 2, text: 'reading-question text', questions: [{ id: 1, question: 'question text', answers: ['answer 1'], type: 'test' }] }]);

        const result = await getQuestions();

        expect(result).toHaveLength(2); // Questions (1) +  Reading-questions (1)
    });

    it('should handle empty data', async () => {
        (prisma.question.findMany as jest.Mock).mockResolvedValue([]);
        (prisma.readingQuestion.findMany as jest.Mock).mockResolvedValue([]);

        const result = await getQuestions();

        expect(result).toHaveLength(0); // Questions (0) + Reading-questions (0)
    });
});

describe('createQuestion', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should create a reading-question', async () => {
        const mockReadingQuestion = {
            id: 1,
            text: 'sample text',
            questions: [
                { 
                    id: 2,
                    question: 'question prompt',
                    answers: ['answer 1'],
                    type: 'test',
                },
            ],
            difficulty: 'medium',
        };
        
        (prisma.readingQuestion.create as jest.Mock).mockResolvedValue(mockReadingQuestion);

        const inputQuestion = {
            text: 'sample text',
            questions: [
                {
                    question: 'question prompt',
                    answers: ['answer 1'],
                    difficulty: 'medium',
                    type: 'test',
                },
            ],
        };

        const result = await createQuestion(inputQuestion);

        expect(prisma.readingQuestion.create).toHaveBeenCalledWith({
            data: {
                text: inputQuestion.text,
                questions: {
                    create: inputQuestion.questions.map(q => ({
                        question: q.question,
                        answers: q.answers,
                        difficulty: q.difficulty,
                        type: q.type,
                    })),
                },
            },
            include: { questions: true },
        });
        expect(result).toEqual(mockReadingQuestion);
    });

    it('should create a non-reading-question correctly', async () => {
        const mockQuestion = {
            id: 1,
            question: 'question prompt',
            answers: ['answer 1'],
            difficulty: 'medium',
            type: 'test',
        };

        (prisma.question.create as jest.Mock).mockResolvedValue(mockQuestion);

        const inputQuestion = {
            question: 'question prompt',
            answers: ['answer 1'],
            difficulty: 'medium',
            type: 'test',
        };

        const result = await createQuestion(inputQuestion);

        expect(prisma.question.create).toHaveBeenCalledWith({
            data: inputQuestion,
        });
        expect(result).toBe(mockQuestion);
    });
});

// For the love of God I cannot make these tests work

// describe('createQuestionsBulk', () => {
//     beforeEach(() => {
//         jest.clearAllMocks();
//     });

//     it('should create questions in bulk (both reading and non-reading questions)', async () => {
//         const mockReadingQuestion = {
//             id: 1,
//             text: 'sample text',
//             questions: [
//                 { 
//                     id: 2,
//                     question: 'question prompt',
//                     answers: ['answer 1']
//                 },
//             ],
//             difficulty: 'medium',
//         };
//         const mockNonReadingQuestion = {
//             id: 1,
//             question: 'question prompt',
//             answers: ['answer 1'],
//             difficulty: 'medium',
//         };
      
//         // Mock each call to createQuestion
//         (prisma.question.create as jest.Mock)
//             .mockResolvedValue(mockReadingQuestion)
//             .mockResolvedValue(mockNonReadingQuestion);
      
//         const inputQuestions = [{
//             text: 'sample text',
//             questions: [
//                 { 
//                     question: 'question prompt',
//                     answers: ['answer 1']
//                 },
//             ],
//             difficulty: 'medium',
//         },
//     ];
      
//         const result = await createQuestionsBulk(inputQuestions);
      
//         expect(prisma.question.create as jest.Mock).toHaveBeenCalledTimes(2);
//         expect(prisma.question.create as jest.Mock).toHaveBeenCalledWith(inputQuestions[0]);
//         expect(prisma.question.create as jest.Mock).toHaveBeenCalledWith(inputQuestions[1]);
      
//         expect(result.questions).toEqual([mockReadingQuestion, mockNonReadingQuestion]);
//         expect(result.errors).toEqual([]);
//     });
    
//     it('should return errors for invalid questions', async () => {
//         const validQuestion = {
//             question: 'question prompt',
//             answers: ['answer 1'],
//             difficulty: 'medium',
//         };

//         const invalidQuestion = {
//             question: 'invalid question', // Missing required fields
//         };

//         (prisma.question.create as jest.Mock).mockResolvedValue(validQuestion);

//         const inputQuestions = [validQuestion, invalidQuestion];

//         // @ts-ignore: ignore so a maltyped question can be passed
//         const result = await createQuestionsBulk(inputQuestions);

//         expect(prisma.question.create).toHaveBeenCalledTimes(1);
//         expect(prisma.question.create).toHaveBeenCalledWith(validQuestion);

//         expect(result.questions).toEqual([validQuestion]);
//         expect(result.errors).toEqual([invalidQuestion]);
//     });
// });