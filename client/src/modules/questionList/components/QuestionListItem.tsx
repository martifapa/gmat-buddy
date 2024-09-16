import { Link } from 'react-router-dom';
import styles from '../styles/QuestionList.module.css';


interface Props {
    id: number,
    question: string,
    type: string,
    difficulty: string,
}

export default function QuestionListItem({ id, question, type, difficulty }: Props) {
    const textLength = 200;
  return (
    <Link to={`question/${id}`} className={styles['question-item']}>
        <div className={styles['question-header']}>
            <p>{difficulty}</p>
            <p>{type}</p>
        </div>
        <p className={styles['question-text']}>{
            question.length > textLength
                ? `${question.substring(0, textLength)}...`
                : question
            }</p>
    </Link>
  )
};