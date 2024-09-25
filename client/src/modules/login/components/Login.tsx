import { Link } from 'react-router-dom';

import Input from '../../../components/input/components/Input';

import styles from '../styles/Login.module.css';
import useAuth from '../../../common/hooks/useAuth';


export default function Login() {
  const {
    username,
    password,
    setUsername,
    setPassword,
    login,
   } = useAuth();

  return (
    <div className={styles['form-container']}>
        <h2 className={styles.title}>Welcome back!</h2>
        <form onSubmit={login} className={styles['user-form']}>
            <Input label='Username' type='text' value={username} setValue={setUsername} />
            <Input label='Password' type='password' value={password} setValue={setPassword}  />
            <input type="submit" value="Login" />
        </form>
        <p>Not a user yet? Register <Link to="/register">here</Link></p>
    </div>
  )
};