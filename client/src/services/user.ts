import axios from "axios";

import { BASE_URL } from "../common/constants";
import { User } from "../common/types/user";
import { authHeader } from "../common/utils";


export const getUserInfo = async (username: string): Promise<User> => {
    try {
        const headers = authHeader()
        const response = await axios.post(
            `${BASE_URL}/user`,
            { username },
            headers,
        );
        return response.data;
    } catch (error) { // placeholder email
        return { username, email: 'Email not found' };
    }
};