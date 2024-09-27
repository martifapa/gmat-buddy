import styles from '../styles/NavBar.module.css';


interface Props {
    src: string,
    label: string,
}

export default function   ({ src, label }: Props) {
  return (
    <div className={styles['labeled-icon']}>
        <img src={src} alt={`${src.replace('.svg', '')} icon`} />
        <p>{label}</p>
    </div>
  )
};