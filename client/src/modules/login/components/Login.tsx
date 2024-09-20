import { Link, useNavigate } from 'react-router-dom';
import { SyntheticEvent } from 'react';
import styles from '../styles/Login.module.css';
import Input from '../../../components/input/Input';
import { useAppDispatch } from '../../../common/hooks/redux';
import { fetchQuestions } from '../../../redux/slices/question';


export default function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    console.log('submit');
    // if login successful --> trigger fetchQuestions
    dispatch(fetchQuestions());
    navigate('/');
  };

  return (
    <div className={styles['form-container']}>
        <h2 className={styles.title}>Welcome back!</h2>
        <form onSubmit={handleSubmit} className={styles['user-form']}>
            <Input label='Email' type='text' />
            <Input label='Password' type='password' />
            <input type="submit" value="Login" />
        </form>
        <p>Not a user yet? Register <Link to="/register">here</Link></p>
    </div>
  )
};