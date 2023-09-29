import axios from './axios';

export const auth = {
    login: (data:{ email: string; password: string }) => {
        return axios.post('/login', data);
    },
    logout: () => {
        return axios.post('/auth/logout');
    },
};