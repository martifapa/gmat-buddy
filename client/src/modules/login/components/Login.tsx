import { Link } from 'react-router-dom';
import { SyntheticEvent } from 'react';
import styles from '../styles/Login.module.css';
import Input from '../../../components/input/Input';


export default function Login() {

    const handleSubmit = (event: SyntheticEvent) => {
        event.preventDefault();
        console.log('submit');
    }

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