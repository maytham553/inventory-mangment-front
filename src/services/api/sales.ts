import type {Sale} from '@/Types';
import axios from './axios';

export const sales = {

    getSales: (page: number) => {
        return axios.get('/auth/sales?page=' + page);
    },
    getSale: (id: number) => {
        return axios.get(`/auth/sales/${id}`);
    },
    createSale: (data: Sale) => {
        return axios.post('/auth/sales', data);
    },
    updateSale: (id: number, data: Sale) => {
        console.log(data);
        return axios.put(`/auth/sales/${id}`, data);
    }
};