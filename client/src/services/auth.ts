import axios from "axios";

import axiosInstance from "./axiosInstance";
import { BASE_URL } from "../common/constants";


export const login = async (username: string, password: string) => {
    try {
        const response = await axiosInstance.post(
            `${BASE_URL}/user/login`,
            { username, password },
        );
        return response.data; // Successful login return user data
    } catch (error) {
        if (axios.isAxiosError(error)) { // Request made and server responded
            if (error.response) {
                return { error: error.response.data.error };
            } else {
                return { error: 'An unexpected error occurred. Please try again' };
            }
        } else { // Request made and server didn't respond?
            return { error: 'An unexpected error occurred. Please try again' };
        }
    }
};

export const register = async (username: string, email: string, password: string, password2: string) => {
    const emailRegex = new RegExp(/^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/gm);
    if (password !== password2) {
        return { error: 'Passwords don\'t match' };
    } else if (!emailRegex.test(email)) {
        return { error: 'Malformatted email' };
    }

    try {
        const response = await axiosInstance.post(
            `${BASE_URL}/user/register`,
            { username, email, password },
        );
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) { // Request made and server responded
            if (error.response) {
                return { error: error.response.data.error };
            } else {
                return { error: 'An unexpected error occurred. Please try again' };
            }
        } else { // Request made and server didn't respond?
            return { error: 'An unexpected error occurred. Please try again' };
        }
    }
};

export const refreshToken = async () => {
    try {
        const response = await axiosInstance.post(
            `${BASE_URL}/user/refresh-token`,
            {},
            { withCredentials: true, }
        );
        
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) { // Request made and server responded
            if (error.response) {
                return { error: error.response.data.error };
            } else {
                return { error: 'An unexpected error occurred. Please try again' };
            }
        } else { // Request made and server didn't respond?
            return { error: 'An unexpected error occurred. Please try again' };
        }
    }
};