import React from "react";
import { useAppDispatch } from "../../../common/hooks/redux";
import { addQuestion } from "../../../redux/slices/question";
import { showToastMessage } from "../../../common/utils";
import useCustomQuestion from "../hooks/useCustomQuestion";
import { Spinner } from "../../../components/spinner/spinner";
import useAutoResizeTextArea from "../hooks/useAutoResizeTextArea";


const CustomQuestion = () => {
    const dispatch = useAppDispatch();
    const {
        solveQuestion,
        getNewAnswer,
        clearAnswer,
        answer,
        question,
        setQuestion,
        loading,
    } = useCustomQuestion();
    const textareaRef = useAutoResizeTextArea();

    const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setQuestion(event.target.value);
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
                className="input questionInput"
                onChange={handleInputChange}
                value={question}
            />
        </fieldset>
        <fieldset>
            <p>Answers</p>
            <div className="new-answer">
                <textarea
                    className="input answerInput"
                    placeholder="Write the answer option here"
                    ref={textareaRef} rows={1}
                />
                <button>+</button>
            </div>
        </fieldset>
        <div className="buttons">
            <button onClick={solveQuestion}>Solve</button>
            { answer !== '' && <button onClick={getNewAnswer}>New answer</button> }
            <button onClick={clearAnswer}>Clear</button>
            <button onClick={handleSaveQuestion}>Save</button>
        </div>
    
        <div className="answer-wrapper">
            { loading && <Spinner /> }
            { answer && <p className="subtitle">AI answer</p> }
            <p>{answer}</p>
        </div>
    </div>);
};


export default CustomQuestion;