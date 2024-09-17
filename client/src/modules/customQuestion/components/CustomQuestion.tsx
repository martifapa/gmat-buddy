import React, { SyntheticEvent, useState } from "react";
import { useAppDispatch } from "../../../common/hooks/redux";
import { addQuestion } from "../../../redux/slices/question";
import { showToastMessage } from "../../../common/utils";
import useCustomQuestion from "../hooks/useCustomQuestion";
import { Spinner } from "../../../components/spinner/spinner";
import useAutoResizeTextArea from "../hooks/useAutoResizeTextArea";

import styles from "../styles/CustomQuestion.module.css";
import CustomAnswer from "./CustomAnswer";
import useCustomAnswers from "../hooks/useCustomAnswers";


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
        dispatch(addQuestion({
            question
        }));
        showToastMessage('Question saved correctly')
    }

    return (<div className={styles['question-detail']}>
        <h2 className={styles.title}>Custom question solver</h2>
        <fieldset>
            <p>Write the question you wish to solve</p>
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
            <button onClick={solveQuestion}>Solve</button>
            { answer !== '' && <button onClick={getNewAnswer}>New answer</button> }
            <button onClick={clearAnswer}>Clear</button>
            <button onClick={handleSaveQuestion}>Save</button>
        </div>
    
        <div className={styles['answer-wrapper']}>
            { loading && <Spinner /> }
            { answer && <p className={styles.subtitle}>AI answer</p> }
            <p>{answer}</p>
        </div>
    </div>);
};


export default CustomQuestion;