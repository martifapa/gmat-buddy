import { SyntheticEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from './redux';
import { logout, saveToken } from '../../redux/slices/auth';
import { login, register } from '../../services/auth';
import { fetchQuestions } from '../../redux/slices/question';
import { fetchReadingQuestions } from '../../redux/slices/readingQuestion';
import { showToastMessage } from '../utils';
import { ERROR, SUCCESS } from '../constants';


export default function useAuth() {
    const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [password2, setPassword2] = useState('');
    
    const handleLogout = () => {
        dispatch(logout());
    }

    const handleLogin = async (event: SyntheticEvent | null = null) => {
        if (event) event.preventDefault();
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

    const handleRegister = async (event: SyntheticEvent) => {
        event.preventDefault();
        const { user, error } = await register(username, email, password, password2);
        if (user) { // login user when register successful
            handleLogin();
            showToastMessage('Welcome aboard!', SUCCESS);
        } else {
            showToastMessage(error, ERROR);
        }
    }

    return {
        email,
        username,
        password,
        password2,
        isAuthenticated,
        setEmail,
        setUsername,
        setPassword,
        setPassword2,
        logout: handleLogout,
        login: handleLogin,
        register: handleRegister,
    }
};