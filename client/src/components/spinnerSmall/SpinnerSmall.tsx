import styles from './SpinnerSmall.module.css';


export const SpinnerSmall = () => {
  return (
    <div className={styles['lds-ring']}><div></div><div></div><div></div><div></div></div>
  )
};