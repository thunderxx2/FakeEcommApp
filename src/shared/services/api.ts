import axios from "axios";

export const api = axios.create({
    baseURL: 'https://fakestoreapi.in/api',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.response.use(
    (response) => response,
    async(error) => {
        return Promise.reject(error);
    }
);