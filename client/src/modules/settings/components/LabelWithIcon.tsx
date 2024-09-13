import { Link } from "react-router-dom";
import styles from '../styles/Settings.module.css';


interface Props {
    to: string,
    source: string,
    alt: string,
    label: string,
}

export default function LabelWithIcon({ to, source, alt, label }: Props) {
  return (
    <Link className={styles['label-with-icon']} to={to}>
        <img className={styles.icon} src={`/public/${source}`} alt={alt} />
        <p>{label}</p>
    </Link>
  )
};