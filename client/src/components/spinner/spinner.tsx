import styles from './Spinner.module.css';


export const Spinner = () => {
  return (
    <div className={styles['lds-ring']}><div></div><div></div><div></div><div></div></div>
  )
};