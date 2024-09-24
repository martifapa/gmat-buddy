import { SyntheticEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from './redux';
import { logout, saveToken } from '../../redux/slices/auth';
import { login } from '../../services/auth';
import { fetchQuestions } from '../../redux/slices/question';
import { fetchReadingQuestions } from '../../redux/slices/readingQuestion';
import { showToastMessage } from '../utils';
import { ERROR } from '../constants';


export default function useAuth() {
    const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    const handleLogout = () => {
        dispatch(logout());
    }

    const handleLogin = async (event: SyntheticEvent) => {
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

    return {
        username,
        password,
        isAuthenticated,
        setUsername,
        setPassword,
        logout: handleLogout,
        login: handleLogin,
    }
};