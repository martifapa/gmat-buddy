import styles from '../styles/CustomQuestion.module.css';


interface Props {
    id: number,
    text: string,
    deleteAnswer: (id:number) => void,
}

export default function CustomAnswer({ id, text, deleteAnswer }: Props) {
  return (
    <div className={styles.answer}>
        <p>{text}</p>
        <button
            className={styles.delete}
            onClick={() => deleteAnswer(id) }
        >
            <img src="/public/close.svg" alt="Cross icon" />
        </button>
    </div>
  )
};