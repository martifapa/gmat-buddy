import Input from '../../../components/input/components/Input';

import useAuth from '../../../common/hooks/useAuth';

import styles from '../styles/Register.module.css';


export default function Register() {
  const {
    username,          // value
    usernameIsValid,   // valueMatchesFieldRegex
    setUsername,       // setValue
    email,             // etc.
    emailIsValid,
    setEmail,
    password,
    passwordIsValid,
    setPassword,
    password2,
    password2IsValid,
    setPassword2,
    register,
  } = useAuth();
  
  return (
    <div className={styles['form-container']}>
        <h2 className={styles.title}>Welcome aboard!</h2>
        <form onSubmit={register} className={styles['user-form']}>
            <Input label='Username' type='text' value={username} setValue={setUsername} isValid={usernameIsValid} />
            <Input label='Email' type='email' value={email} setValue={setEmail} isValid={emailIsValid} />
            <Input label='Password' type='password' value={password} setValue={setPassword} isValid={passwordIsValid} />
            <Input label='Repeat password' type='password' value={password2} setValue={setPassword2} isValid={password2IsValid && password === password2} />
            <input
              type="submit"
              value="Register"
              className={usernameIsValid && emailIsValid && passwordIsValid && password2IsValid ? '' : styles.disabled}
            /> 
        </form>
    </div>
  )
};