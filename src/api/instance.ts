import axios from "axios";

export const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    withCredentials: true,
    headers: {
        'API-KEY': '45f7e81f-f8ff-431e-baa0-2c111e577fe6',
    }
})