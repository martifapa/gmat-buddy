import { useEffect, useState } from 'react'


interface Props {
    regex: RegExp,
}

export default function useInputForm({ regex }: Props) {
  const [value, setValue] = useState('');
  const [isValid, setIsValid] = useState<null | boolean>(null);

  useEffect(() => {
    // Check validity after timeout
    const debounceTimeout = setTimeout(() => {
        if (value === '') {
            setIsValid(null);
        } else {
            setIsValid(regex.test(value));
        }
    }, 500);

    // Remove timeout if value is set before the delay
    return () => clearTimeout(debounceTimeout);
  }, [value, regex]);

  return {
    value,
    isValid,
    setValue,
  }
};