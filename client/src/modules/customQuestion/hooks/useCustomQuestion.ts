import { useState } from 'react'
import { getNewAnswer, solveQuestion } from '../../../services/question';


export default function useCustomQuestion() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState(-1);
  const [explanation, setExplanation] = useState('');
  const [loading, setLoading] = useState(false);

  const parseFullQuestion = (question: string, answers: string[]) => {
    const indexedAnswers = answers.map((a, idx) => {
      return [idx, a].join(' ');
    });
    
    return question + '\n\n' + indexedAnswers.join('\n');
  }

  const handleSolveQuestion = async (answers: string[]) => {
    setLoading(true);
    const { answerIdx, explanation } = await solveQuestion(parseFullQuestion(question, answers));
    setAnswer(answerIdx);
    setExplanation(explanation);
    setLoading(false);
  }

  const handleNewAnswer = async () => {
    setLoading(true);
    const { explanation: newExplanation } = await getNewAnswer(question, explanation);
    setExplanation(newExplanation);
    setLoading(false);
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
    loading,
  }
};