import useLoadingButton from '../../../common/hooks/useLoadingButton';
import { SpinnerSmall } from '../../spinnerSmall/SpinnerSmall';
import styles from '../styles/ButtonWithLoadingSpinner.module.css';


interface Props {
    onClick: () => Promise<void>,
    className: string,
    label: string,
}

export default function ButtonWithLoadingSpinner({ onClick, className, label }: Props) {
  const { isLoading, handleClick } = useLoadingButton();

  return (
    <button
        onClick={() => handleClick(onClick)}
        className={`${className} ${styles['inner-spinner']} ${isLoading ? styles.loading : ''}`}
    >
        {label}
        {isLoading ? <SpinnerSmall /> : null}
    </button>
    );
};