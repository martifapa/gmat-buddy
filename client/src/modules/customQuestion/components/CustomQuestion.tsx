import React from "react";
import { showToastMessage } from "../../../common/utils";
import { useAppDispatch } from "../../../common/hooks/redux";
import { useCustomAnswers, useAutoResizeTextArea, useCustomQuestion } from "../hooks";
import { addQuestion } from "../../../redux/slices/question";
import { Spinner } from "../../../components/spinner/spinner";
import CustomAnswer from "./CustomAnswer";

import styles from "../styles/CustomQuestion.module.css";


const CustomQuestion = () => {
    const dispatch = useAppDispatch();

    const {
        solveQuestion,
        getNewAnswer,
        clearAnswer,
        answer,
        explanation,
        question,
        setQuestion,
        loading,
    } = useCustomQuestion();

    const {
        answers,
        newAnswer,
        setNewAnswer,
        addAnswer,
        deleteAnswer,
    } = useCustomAnswers();

    const questionTextareaRef = useAutoResizeTextArea();
    const answerTextareaRef = useAutoResizeTextArea();

    const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setQuestion(event.target.value);
    }

    const handleSaveQuestion = () => {
        dispatch(addQuestion({ question, answers }));
        showToastMessage('Question saved correctly')
    }

    return (
    <div className={styles['question-detail']}>
        <h2 className={styles.title}>Custom question solver</h2>
        <fieldset>
            <p>Write the question you want to solve or save</p>
            <textarea
                className={`${styles.input} ${styles['question-input']}`}
                onChange={handleInputChange}
                value={question}
                ref={questionTextareaRef} rows={1}
            />
        </fieldset>

        <div className={styles.answers}>
            {answers.map((savedAnswer, idx) =>
                <CustomAnswer
                    key={idx}
                    id={idx}
                    text={savedAnswer}
                    deleteAnswer={deleteAnswer}
                    correct={answer === idx}
                />
            )}
        </div>

        <fieldset>
            <p>Answers</p>
            <div className={styles['new-answer']}>
                <textarea
                    className={styles.input}
                    placeholder="Write the answer option here"
                    onChange={setNewAnswer}
                    value={newAnswer}
                    ref={answerTextareaRef} rows={1}
                />
                <button
                    className={`${styles['add-question']} ${answers.length === 5 ? styles.disabled : ''}`}
                    onClick={addAnswer}    
                >+</button>
            </div>
        </fieldset>
        <div className={styles.buttons}>
            <button onClick={ () => solveQuestion(answers) }>Solve</button>
            { explanation !== '' && <button onClick={getNewAnswer}>New answer</button> }
            <button onClick={clearAnswer}>Clear</button>
            <button
                onClick={handleSaveQuestion}
                className={answers.length === 5 && question ? '' : styles.disabled}
            >Save</button>
        </div>

        { loading && <Spinner /> }
        { explanation && <p className={styles.subtitle}>Explanation</p> }
        <p>{explanation}</p>
    </div>
    );
};


export default CustomQuestion;