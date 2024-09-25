import LabelWithIcon from './LabelWithIcon';

import styles from '../styles/Settings.module.css';


export default function Settings() {
  return (
    <div className={styles['settings-container']}>
        <h2 className={styles.title}>Settings</h2>
        <div className={styles.sidebar}>
            <LabelWithIcon
                to='#'
                source='avatar.svg'
                alt='Avatar logo'
                label='Account'/>
            <LabelWithIcon
                to='#'
                source='avatar.svg'
                alt='Avatar logo'
                label='Manage account'/>
        </div>
        <div className={styles.content}>
            content
        </div>
    </div>
  )
};