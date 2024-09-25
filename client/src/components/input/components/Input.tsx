import { useState } from 'react';
import styles from '../styles/Input.module.css';


interface Props {
    label: string,
    type: string,
    value: string,
    setValue: (value: string) => void,
    isValid: null | boolean,
}

export default function Input({ label, type, value, setValue, isValid }: Props) {
  const [visibility, setVisibility] = useState(false);
  const [iconPath, setIconPath] = useState('/visibility.svg');

  let className = '';

  if (isValid === false) {
    className = 'invalid';
  }

  const handleIconClick = () => {
    setVisibility(!visibility);
    setIconPath(visibility ? '/visibility.svg' : '/visibilityOff.svg');
  }

  return (
      <label>
          { label }
          <div className={styles.input}>
            <input
                type={['text', 'email'].includes(type) || visibility ? 'text' : 'password'}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className={styles[className]}
              />
              {
                type === 'password'
                  ? (
                  <img
                    src={iconPath}
                    alt="Visibility icon"
                    className={styles.icon}
                    onClick={handleIconClick}
                  />)
                  : null
                }
          </div>
      </label>
  )
};