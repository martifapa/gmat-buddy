import { SyntheticEvent } from 'react';
import Input from '../../../components/input/Input';
import styles from '../styles/Register.module.css';


export default function Register() {

    const handleSubmit = (event: SyntheticEvent) => {
        event.preventDefault();
        console.log('register');
    }
    
  return (
    <div className={styles['form-container']}>
        <h2>Welcome aboard!</h2>
        <form onSubmit={handleSubmit}>
            <Input label='Username' type='text' />
            <Input label='Email' type='email' />
            <Input label='Password' type='password' />
            <Input label='Repeat password' type='password' />
            <input type="submit" value="Register" />
        </form>
    </div>
  )
};