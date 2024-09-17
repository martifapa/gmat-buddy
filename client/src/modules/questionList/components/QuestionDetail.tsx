import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useQuestionDetail from "../hooks/useQuestionDetail";
import { Spinner } from "../../../components/spinner/spinner";
import { setClassNames } from "../../../common/utils";

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
        setSelected(-1); // Reset selected answer onload new question
    }, [questionId])

    const handleSelectAnswer = (id: number) => {
        solveQuestion();
        setSelected(id);
    };

    if (question === undefined) {
        return <div className="notfound">
            <p>Question not found</p>
        </div>
    };

    return (<div className={styles['question-detail']}>
        <h2 className={styles.title}>Question</h2>
        <div>
            <p className={styles.question}>{question.question}</p>
            {question.answers.map((option, idx) => 
                <button 
                    key={idx}
                    onClick={ () => handleSelectAnswer(idx) }
                    className={`${styles['question-answer']} ${styles[setClassNames(idx, selected, answer)]}`}
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
        { explanation && <h3 className={styles.subtitle}>Explanation</h3>}
        <p className={styles["ai-answer"]}>{explanation}</p>
    </div>);
};


export default QuestionDetail;