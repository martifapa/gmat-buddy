import { Link } from 'react-router-dom';

import styles from '../styles/QuestionList.module.css';


interface Props {
    id: number,
    text: string,
    questions: {
        id: number,
        question: string,
        answers: string[],
        difficulty?: string,
        readingQuestionId: number,
    }[],
}

export default function ReadingQuestionListItem({ id, text, questions }: Props) {
    const textLength = 200;
  return (
    <Link to={`question/${id}`} className={styles['question-item']}>
        <div className={styles['question-header']}>
            <p>*</p>
            <p>Reading</p>
        </div>
        <p className={styles['question-text']}>{
            text.length > textLength
                ? `${text.substring(0, textLength)}...`
                : text
            }</p>
    </Link>
  );
};