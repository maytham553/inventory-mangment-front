import type { Customer } from '@/Types';
import axios from './axios';

export const customers = {

    getCustomers: (page : number) => {
        return axios.get('/auth/customers?page=' + page);
    },
    getCustomer: (id: number) => {
        return axios.get(`/auth/customers/${id}`);
    },
    createCustomer: (data: Customer) => {
        return axios.post('/auth/customers', data);
    },
    updateCustomer: (id: number, data: Customer) => {
        console.log(data);
        return axios.put(`/auth/customers/${id}`, data);
    },
    deleteCustomer: (id: number) => {
        return axios.delete(`/auth/customers/${id}`);
    },
};