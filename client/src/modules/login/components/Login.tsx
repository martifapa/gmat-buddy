import { Link, useNavigate } from 'react-router-dom';
import { SyntheticEvent, useState } from 'react';

import Input from '../../../components/input/Input';
import { useAppDispatch } from '../../../common/hooks/redux';
import { fetchQuestions } from '../../../redux/slices/question';
import { fetchReadingQuestions } from '../../../redux/slices/readingQuestion';
import { login } from '../../../services/auth';
import { saveToken } from '../../../redux/slices/auth';
import { showToastMessage } from '../../../common/utils';
import { ERROR } from '../../../common/constants';

import styles from '../styles/Login.module.css';


export default function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    const { token, error } = await login(username, password);
    
    if (token) { // login successful
      dispatch(saveToken(token));
      dispatch(fetchQuestions());
      dispatch(fetchReadingQuestions());
      navigate('/');
    } else {
      showToastMessage(error, ERROR)
    }
    
  };

  return (
    <div className={styles['form-container']}>
        <h2 className={styles.title}>Welcome back!</h2>
        <form onSubmit={handleSubmit} className={styles['user-form']}>
            <Input label='Username' type='text' value={username} setValue={setUsername} />
            <Input label='Password' type='password' value={password} setValue={setPassword}  />
            <input type="submit" value="Login" />
        </form>
        <p>Not a user yet? Register <Link to="/register">here</Link></p>
    </div>
  )
};