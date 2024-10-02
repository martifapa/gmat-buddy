import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

import { getNewAnswer, solveQuestion } from '../../../services/question';
import { useAppSelector } from '../../../common/hooks/redux';


export default function useQuestionDetail(id: number) {
  const navigate = useNavigate();
  const question = useAppSelector(state => state.questions.questionBank.find(q => q.id === id));
  
  const [loading, setLoading] = useState(false);
  
  const [explanation, setExplanation] = useState('');
  const [answer, setAnswer] = useState(-1);
  const [explanationIdx, setExplanationIdx] = useState(-1);

  const parseFullQuestion = () => {
    const indexedAnswers = question?.answers.map((a, idx) => {
      return [idx, a].join(' ');
    });
    
    return question?.question + '\n\n' + indexedAnswers?.join('\n')
  }

  const handleSolveQuestion = async () => {
    if (!question?.question) return;

    // At least one explanation stored in DDBB
    if (question.explanations.length > 0 && question.correct) {
      const storedExplanation = question.explanations[0];

      setAnswer(question.correct);
      setExplanation(storedExplanation.explanation);
      setExplanationIdx(0); // "start" explanationIdx counter
    } else { // Question's explanation not stored
      const { answerIdx, explanation } = await solveQuestion(question.id, parseFullQuestion(), question.type);
      setAnswer(answerIdx);
      setExplanation(explanation);
    }
  } 

  const handleNewExplanation = async () => {
    if (!question?.question) return;
    
    if (question.explanations.length > explanationIdx + 1) {
      // Get next explanation
      const storedExplanation = question.explanations[explanationIdx + 1];
      
      setExplanation(storedExplanation.explanation);
      setExplanationIdx((prevIdx) => prevIdx + 1);
    } else {
      const { explanation: newExplanation } = await getNewAnswer(question.id, parseFullQuestion(), explanation);
      setExplanation(newExplanation);
    }
  }

  const navigateToQuestion = (idx: number) => {
    setExplanation('');
    setAnswer(-1);
    setLoading(false);
    navigate(`/question/${idx}`);
  }

  return {
    solveQuestion: handleSolveQuestion,
    getNewAnswer: handleNewExplanation,
    navigateToQuestion,
    explanation,
    answer,
    question,
    loading
  }
};