import axios from "axios";
import { BASE_URL } from "../common/constants";


export const login = async (username: string, password: string) => {
    const response = await axios.post(
        `${BASE_URL}/user/login`,
        { username, password },
    );
    
    return response.data;
}