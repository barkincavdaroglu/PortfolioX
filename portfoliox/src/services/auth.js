import axios from "axios";
import { API_URL } from "../lib/constants";

const URL = `${API_URL}`

export const loginUserService = async (userData) => {
    const { data } = await axios.post(URL + "/users/login", userData);
    return data;
}

export const registerUserService = async (userData) => {
    const { data } = await axios.post(URL + "/users/register", { username: userData.username,  name: userData.name, email: userData.email, password: userData.password });
    return data;
}