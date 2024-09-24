import styles from '../styles/Input.module.css';


interface Props {
    label: string,
    type: string,
    value: string,
    setValue: (value: string) => void,
    isValid: null | boolean,
}

export default function Input({ label, type, value, setValue, isValid }: Props) {
  let className = '';

  if (isValid === false) {
    className = 'invalid';
  }

  return (
      <label>
          { label }
          <input
              type={ type }
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className={styles[className]} />
      </label>
  )
};