import LabelWithIcon from './LabelWithIcon';
import { useAppSelector } from '../../../common/hooks/redux';

import styles from '../styles/Settings.module.css';


export default function Settings() {
  const { username, email } = useAppSelector(state => state.user);

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
                source='delete.svg'
                alt='Avatar logo'
                label='Delete account'/>
        </div>
        <div className={styles.content}>
            <div className={styles.section}>
              <h2 className={styles['section-title']}>Personal information</h2>
              <fieldset>
                <label>Username</label>
                <input type="text" value={username}/>
              </fieldset>
              <fieldset>
                <label>Email:</label>
                <input type="email" value={email}/>
              </fieldset>
              <button>Save</button>
            </div>
            <div className={styles.section}>
              <h2 className={styles['section-title']}>Security</h2>
              <fieldset>
                <label>Password:</label>
                <input type="password"/>
                <button>Change password</button>
              </fieldset>
            </div>
        </div>
    </div>
  )
};