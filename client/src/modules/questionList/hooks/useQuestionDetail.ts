import { useState } from 'react'
import { getNewAnswer, solveQuestion } from '../../../services/question';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../common/hooks/redux';


export default function useQuestionDetail(id: number) {
  const question = useAppSelector(state => state.questions.questionBank.find(q => q.id === id));
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [explanation, setExplanation] = useState('');
  const [answer, setAnswer] = useState(-1);

  const parseFullQuestion = () => {
    const indexedAnswers = question?.answers.map((a, idx) => {
      return [idx, a].join(' ');
    });
    
    return question?.question + '\n\n' + indexedAnswers?.join('\n')
  }

  const handleSolveQuestion = async () => {
    if (!question?.question) return;

    const { answerIdx, explanation } = await solveQuestion(parseFullQuestion(), question.type);
    setAnswer(answerIdx);
    setExplanation(explanation);
  } 

  const handleNewExplanation = async () => {
    if (!question?.question) return;
    
    const { explanation: newExplanation } = await getNewAnswer(parseFullQuestion(), explanation);
    setExplanation(newExplanation);
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