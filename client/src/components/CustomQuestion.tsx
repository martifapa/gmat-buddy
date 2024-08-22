import React, { useState } from "react";
import { getNewAnswer, solveQuestion } from "../services/question";
import { useAppDispatch } from "../common/hooks";
import { addQuestion } from "../redux/slices/question";
import { showToastMessage } from "../common/utils";

const CustomQuestion = () => {
    const dispatch = useAppDispatch();
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');

    const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setQuestion(event.target.value);
    }

    const handleSolveQuestion = async () => {
        const answer = await solveQuestion(question);
        setAnswer(answer);
    }

    const handleNewAnswer = async () => {
        const newAnswer = await getNewAnswer(question, answer);
        setAnswer(newAnswer);
    }

    const handleClearTextArea = () => {
        // Improvement: transition (setTimout)
        setQuestion('');
        setAnswer('');
    }

    const handleSaveQuestion = () => {
        dispatch(addQuestion({
            question
        }));
        showToastMessage('Question saved correctly')
    }

    return (<div className="questionDetail">
        <h2 className="title">Custom question solver</h2>
        <fieldset>
            <p>Write the question you wish to solve</p>
            <textarea
                className="questionInput"
                onChange={handleInputChange}
                value={question}
            />
        </fieldset>
        <div className="buttons">
            <button onClick={handleSolveQuestion}>Solve</button>
            {answer !== '' && <button onClick={handleNewAnswer}>New answer</button>}
            <button onClick={handleClearTextArea}>Clear</button>
            <button onClick={handleSaveQuestion}>Save</button>
        </div>
    
        <div className="answer-wrapper">
            {answer && <p className="subtitle">AI answer</p>}
            <p>{answer}</p>
        </div>
    </div>);
};


export default CustomQuestion;