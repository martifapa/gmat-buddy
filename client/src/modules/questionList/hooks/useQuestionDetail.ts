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

  const processExplanation = async (explanation: string) => {
    // Extract correct answer option (A to E)
    const answerLetter = explanation.match(/\([A-E]\)/);
    if (answerLetter) {
      const letter = answerLetter[0].slice(1, -1).toLowerCase() as keyof typeof letterToIndex;
      const answerIdx = letterToIndex[letter];
      setAnswer(answerIdx);
    }
    setExplanation(explanation);
  }

  const parseFullQuestion = () => {
    return question?.question + '\n' + question?.answers.join('\n')
  }

  const handleSolveQuestion = async () => {
    if (!question?.question) return;

    setLoading(true);
    const explanation = await solveQuestion(parseFullQuestion());
    await processExplanation(explanation);
    setLoading(false);
  } 

  const handleNewExplanation = async () => {
    if (!question?.question) return;
    
    setLoading(true);
    const newExplanation = await getNewAnswer(parseFullQuestion(), explanation);
    await processExplanation(newExplanation);
    setLoading(false);
  }

  const navigateToQuestion = (idx: number) => {
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

const letterToIndex = {
  a: 0,
  b: 1,
  c: 2,
  d: 3,
  e: 4,
}