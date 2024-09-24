import axios from "axios";
import { BASE_URL } from "../common/constants";


export const login = async (username: string, password: string) => {
    try {
        const response = await axios.post(
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
}