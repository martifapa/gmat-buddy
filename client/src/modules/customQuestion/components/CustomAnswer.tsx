import styles from '../styles/CustomQuestion.module.css';


interface Props {
    id: number,
    text: string,
    deleteAnswer: (id:number) => void,
    correct: boolean,
}

export default function CustomAnswer({ id, text, deleteAnswer, correct }: Props) {
  return (
    <div className={`${styles.answer} ${correct ? styles.correct : ''}`}>
        <p>{text}</p>
        <button
            className={styles.delete}
            onClick={() => deleteAnswer(id) }
        >
            <img src="/close.svg" alt="Cross icon" />
        </button>
    </div>
  )
};