import React from "react";

import { useAppDispatch } from "../../../common/hooks/redux";
import { useCustomAnswers, useAutoResizeTextArea, useCustomQuestion } from "../hooks";
import { saveQuestion } from "../../../redux/slices/question";
import CustomAnswer from "./CustomAnswer";
import useToggle from "../../navBar/hooks/useToggle";
import { QUESTION_TYPES, SUCCESS } from "../../../common/constants";
import ButtonWithLoadingSpinner from "../../../components/ButtonWithLoadingSpinner/components/ButtonWithLoadingSpinner";

import styles from "../styles/CustomQuestion.module.css";
import useToast from "../../../common/hooks/useToast";


const CustomQuestion = () => {
    const dispatch = useAppDispatch();

    const [toggleState, { toggle }] = useToggle();

    const { toast } = useToast();

    const {
        solveQuestion,
        getNewAnswer,
        clearAnswer,
        answer,
        explanation,
        question,
        questionType,
        setQuestion,
        setQuestionType,
    } = useCustomQuestion();

    const {
        answers,
        newAnswer,
        setNewAnswer,
        addAnswer,
        deleteAnswer,
        clearAnswers,
    } = useCustomAnswers();

    const questionTextareaRef = useAutoResizeTextArea();
    const answerTextareaRef = useAutoResizeTextArea();

    const clearQuestion = () => {
        clearAnswer();
        clearAnswers();
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setQuestion(event.target.value);
    };

    const handleSaveQuestion = () => {
        const readingQuestionId = null; // To remove when saving reading-questions is supported
        dispatch(saveQuestion({ question, type: questionType, answers, readingQuestionId }));
        toast(SUCCESS, 'Question saved correctly');
    };

    return (
        <div className={styles['question-detail']}>
            <h2 className={styles.title}>Custom question</h2>
            <div className={styles['question-type']}>
                <div
                    className={styles['dropdown']}
                    onClick={toggle}
                >
                    <div className={styles['selected-type']}>
                        <p>{questionType || 'Question type'}</p>
                        <img className={`${styles.arrow} ${toggleState ? styles.selected : ''}`} src="/chevronLeft.svg" alt="Arrow icon" />
                    </div>
                    { toggleState &&
                        <div className={`${styles['dropdown-content']} ${styles.expanded}`}>
                            {QUESTION_TYPES.map(type =>
                                <p
                                    key={type}
                                    onClick={() => setQuestionType(type)}
                                >
                                    {type}</p>
                            )}
                        </div>
                    }
                </div>
            </div>

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
                        onChange={(e) => setNewAnswer(e.target.value)}
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

                <button
                    onClick={clearQuestion}
                    className={question || answers.length > 0 ? '' : styles.disabled}    
                >Clear</button>

                <ButtonWithLoadingSpinner
                    onClick={async () => handleSaveQuestion() }
                    className={question && answers.length === 5 && questionType ? '' : styles.disabled}
                    label="Save"
                />

                <ButtonWithLoadingSpinner
                    onClick={async () => solveQuestion(answers)}
                    className={question && answers.length === 5 ? '' : styles.disabled}
                    label="Solve"
                />

                {
                    explanation !== '' &&
                    <ButtonWithLoadingSpinner
                        onClick={async () => getNewAnswer()}
                        className={question ? '' : styles.disabled}
                        label="New answer"
                    />
                }
            </div>

            { explanation && <p className={styles.subtitle}>Explanation</p> }
            <p>{explanation}</p>
        </div>
    );
};


export default CustomQuestion;