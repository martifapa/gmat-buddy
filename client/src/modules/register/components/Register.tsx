import Input from '../../../components/input/Input';

import styles from '../styles/Register.module.css';
import useAuth from '../../../common/hooks/useAuth';


export default function Register() {
  const {
    username,
    email,
    password,
    password2,
    setUsername,
    setEmail,
    setPassword,
    setPassword2,
    register,
  } = useAuth();
    
  return (
    <div className={styles['form-container']}>
        <h2 className={styles.title}>Welcome aboard!</h2>
        <form onSubmit={register} className={styles['user-form']}>
            <Input label='Username' type='text' value={username} setValue={setUsername} />
            <Input label='Email' type='text' value={email} setValue={setEmail} />
            <Input label='Password' type='password' value={password} setValue={setPassword} />
            <Input label='Repeat password' type='password' value={password2} setValue={setPassword2} />
            <input type="submit" value="Register" />
        </form>
    </div>
  )
};