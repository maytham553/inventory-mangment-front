import axios from './axios';

export const users = {
    getUser: (id: number) => {
        return axios.get(`/auth/users/${id}`);
    }
};