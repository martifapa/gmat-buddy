import { Link } from 'react-router-dom'

interface Props {
    route: string,
    imgSrc: string,
    alt: string,
    label: string,
    onClick?: () => void,
}

export default function DropdownOption({ route, imgSrc, alt, label, onClick }: Props) {
  return (
    <Link to={route} onClick={onClick}>
        <img src={imgSrc} alt={alt} />
        <p>{label}</p>
    </Link>
  )
};