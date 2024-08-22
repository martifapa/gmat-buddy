import { useState } from "react";
import { getNewAnswer, solveQuestion } from "../services/question";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../common/hooks";

const QuestionDetail = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const questionId = Number(id);
    const question = useAppSelector(state => state.questions.questionBank.find(q => q.id === questionId));
    const [answer, setAnswer] = useState('');

    if (question === undefined) {
        return <div className="notfound">
            <p>Question not found</p>
        </div>
    }


    const handleSolveQuestion = async () => {
        const answer = await solveQuestion(question.question);
        setAnswer(answer);
    }

    const handleNewAnswer = async () => {
        const newAnswer = await getNewAnswer(question.question, answer);
        setAnswer(newAnswer);
    }

    const navigateToQuestion = (idx: number) => {
        navigate(`/question/${idx}`)
    }

    // Regular expression to split the string at (A), (B), (C), (D), (E)
    const questionLines = question.question.split(/(\([A-E]\).+?)(?=\s*\([A-E]\)|$)/g).filter(Boolean);

    return (<div className="questionDetail">
        <h2 className="title">Question</h2>
        <fieldset>
            {questionLines.map((line, idx) => {
                if (idx === 0) {
                    return <p key={idx} className="questionPrompt">{line}</p>
                } else {
                    return <p key={idx} className="questionAnswer">{line}</p>
                }
            })}
            <div className="questionNavigate">
                <button onClick={() => navigateToQuestion(questionId - 1)}>Previous</button>
                <button onClick={() => navigateToQuestion(questionId + 1)}>Next</button>
            </div>
        </fieldset>
        <div className="buttons">
            <button onClick={handleSolveQuestion}>Solve</button>
            {answer !== '' && <button onClick={handleNewAnswer}>New answer</button>}
        </div>
        <p>{answer}</p>
    </div>);
};


export default QuestionDetail;