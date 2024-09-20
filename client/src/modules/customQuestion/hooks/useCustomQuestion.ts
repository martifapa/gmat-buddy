import { useState } from 'react'
import { getNewAnswer, solveQuestion } from '../../../services/question';


export default function useCustomQuestion() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState(-1);
  const [explanation, setExplanation] = useState('');

  const parseFullQuestion = (question: string, answers: string[]) => {
    const indexedAnswers = answers.map((a, idx) => {
      return [idx, a].join(' ');
    });
    
    return question + '\n\n' + indexedAnswers.join('\n');
  }

  const handleSolveQuestion = async (answers: string[]) => {
    const { answerIdx, explanation } = await solveQuestion(parseFullQuestion(question, answers));
    setAnswer(answerIdx);
    setExplanation(explanation);
  }

  const handleNewAnswer = async () => {
    const { explanation: newExplanation } = await getNewAnswer(question, explanation);
    setExplanation(newExplanation);
  }

  const handleClearAnswer = () => {
    setAnswer(-1);
    setQuestion('');
    setExplanation('');
  }
  
  return {
    solveQuestion: handleSolveQuestion,
    getNewAnswer: handleNewAnswer,
    clearAnswer: handleClearAnswer,
    answer,
    explanation,
    question,
    setQuestion,
  }
};