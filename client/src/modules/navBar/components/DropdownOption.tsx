import { Link } from 'react-router-dom';

import styles from '../styles/NavBar.module.css';


interface Props {
    route: string,
    imgSrc: string,
    alt: string,
    label: string,
    onClick?: () => void,
}

export default function DropdownOption({ route, imgSrc, alt, label, onClick }: Props) {
  return (
    <Link to={route} onClick={onClick} className={styles['dropdown-option']}>
        <img src={imgSrc} alt={alt} />
        <p>{label}</p>
    </Link>
  )
};