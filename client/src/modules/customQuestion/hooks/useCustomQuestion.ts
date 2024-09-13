import { useState } from 'react'
import { getNewAnswer, solveQuestion } from '../../../services/question';


export default function useCustomQuestion() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSolveQuestion = async () => {
    setLoading(true);
    const answer = await solveQuestion(question);
    setAnswer(answer);
    setLoading(false);
  }

  const handleNewAnswer = async () => {
    setLoading(true);
    const newAnswer = await getNewAnswer(question, answer);
    setAnswer(newAnswer);
    setLoading(false);
  }

  const handleClearAnswer = () => { 
    setAnswer('');
    setQuestion('');
  }
  
  return {
    solveQuestion: handleSolveQuestion,
    getNewAnswer: handleNewAnswer,
    clearAnswer: handleClearAnswer,
    answer,
    question,
    setQuestion,
    loading,
  }
};