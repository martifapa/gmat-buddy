import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import useQuestionDetail from "../hooks/useQuestionDetail";
import { setClassNames } from "../../../common/utils";
import ButtonWithLoadingSpinner from "../../../components/ButtonWithLoadingSpinner/components/ButtonWithLoadingSpinner";
import { useAppSelector } from "../../../common/hooks/redux";

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
    } = useQuestionDetail(questionId);
    
    const [selected, setSelected] = useState(-1);
    const [text, setText] = useState(''); // Text linked to Reading Question
    
    const rootQuestion = question
        ? useAppSelector(state => state.readingQuestions.questions.find(q => q.id === question.readingQuestionId))
        : null;

    useEffect(() => {
        setSelected(-1); // Reset selected answer onload new question
        if (question?.readingQuestionId) {
            setText(rootQuestion?.text || '');
        }
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
        { question.readingQuestionId &&
            <p>{text}</p>
        }
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
            <ButtonWithLoadingSpinner
                onClick={async () => solveQuestion()}
                className={question ? '' : styles.disabled}
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
        
        { explanation && <h3 className={styles.subtitle}>Explanation</h3>}
        <p className={styles["ai-answer"]}>{explanation}</p>
    </div>);
};


export default QuestionDetail;