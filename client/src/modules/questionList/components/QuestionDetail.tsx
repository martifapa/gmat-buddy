import { useParams } from "react-router-dom";
import useQuestionDetail from "../hooks/useQuestionDetail";
import { Spinner } from "../../../components/spinner/spinner";
import { useEffect, useState } from "react";

import styles from '../styles/QuestionList.module.css';


const QuestionDetail = () => {
    const { id } = useParams();
    const questionId = Number(id);
    const { 
        solveQuestion,
        getNewAnswer,
        navigateToQuestion,
        explanation,
        answer,
        question,
        loading
    } = useQuestionDetail(questionId);

    const [selected, setSelected] = useState(-1);

    useEffect(() => {
        setSelected(-1); // Reset selected answer
    }, [questionId])

    const handleSelectAnswer = (id: number) => {
        solveQuestion();
        setSelected(id);
    }

    const setClassNames = (id: number, selected: number, correct: number ) => {
        if (correct !== -1) { // Question already solved
            if (correct === id) {
                return 'correct';
            } else if (correct !== id && id === selected) {
                return 'incorrect';
            }
        } else { // Question not solved yet
            if (id === selected) {
                return 'selected';
            }
        }
    }

    if (question === undefined) {
        return <div className="notfound">
            <p>Question not found</p>
        </div>
    }

    return (<div className={styles['question-detail']}>
        <h2 className={styles.title}>Question</h2>
        <div>
            <p className={styles.question}>{question.question}</p>
            {question.answers.map((option, idx) => 
                <button 
                    onClick={ () => handleSelectAnswer(idx) } key={idx}
                    className={`${styles['question-answer']} ${setClassNames(idx, selected, answer)}`}
                >{ option }</button>
            )}
            <div className={styles['question-navigate']}>
                <button onClick={ () => navigateToQuestion(questionId - 1) }>Previous</button>
                <button onClick={ () => navigateToQuestion(questionId + 1) }>Next</button>
            </div>
        </div>
        <div className={styles.buttons}>
            <button onClick={ solveQuestion }>Solve</button>
            { explanation !== '' && <button onClick={ getNewAnswer }>New explanation</button> }
        </div>
        { loading && <Spinner /> }
        <p className={styles["ai-answer"]}>{explanation}</p>
    </div>);
};


export default QuestionDetail;