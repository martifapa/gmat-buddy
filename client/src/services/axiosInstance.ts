import axios from 'axios';

import store from '../redux/store';
import { refreshToken } from './auth';
import { saveToken } from '../redux/slices/auth';
import { BASE_URL } from '../common/constants';


const axiosInstance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
});

// Add auth header
axiosInstance.interceptors.request.use(
    (config) => {
        const token = store.getState().auth.token;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Handle token expiration and retry failed requests
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        // Try refreshing the token
        if (
            error.response.status === 401
            && error.response.data === 'Token invalid'
        && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const { token } = await refreshToken();

                store.dispatch(saveToken(token));
                
                originalRequest.headers.Authorization = `Bearer ${token}`;

                return axiosInstance(originalRequest);
            } catch (refreshError) {
                return Promise.reject(refreshError);
            }
        }

        // Error not related to token expiration
        return Promise.reject(error);
    }
);


export default axiosInstance;