import axiosInstance from "./axiosInstance";
import { BASE_URL } from "../common/constants";
import { User } from "../common/types/user";


export const getUserInfo = async (username: string): Promise<User> => {
    try {
        const response = await axiosInstance.post(
            `${BASE_URL}/user`,
            { username },
        );
        return response.data;
    } catch (error) { // placeholder email
        return { username, email: 'Email not found' };
    }
};