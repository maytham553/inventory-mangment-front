import type { User } from '@/Types';
import axios from './axios';

export const users = {
    getUsers: (page: number, search = '') => {
        return axios.get(
            '/auth/users?page=' + page + '&search=' + encodeURIComponent(search)
        );
    },
    getUser: (id: number) => {
        return axios.get(`/auth/users/${id}`);
    },
    createUser: (data: User) => {
        return axios.post('/auth/users', data);
    },
    updateUser: (id: number, data: Partial<User>) => {
        return axios.put(`/auth/users/${id}`, data);
    },
    deleteUser: (id: number) => {
        return axios.delete(`/auth/users/${id}`);
    },
};
