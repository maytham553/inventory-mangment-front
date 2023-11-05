import type { Supplier } from '@/Types';
import axios from './axios';

export const suppliers = {

    getSuppliers: (page: number , search:string) => {
        return axios.get('/auth/suppliers?page=' + page + "&search=" + search);
    },
    getSupplier: (id: number) => {
        return axios.get(`/auth/suppliers/${id}`);
    },
    createSupplier: (data: Supplier) => {
        return axios.post('/auth/suppliers', data);
    },
    updateSupplier: (id: number, data: Supplier) => {
        console.log(data);
        return axios.put(`/auth/suppliers/${id}`, data);
    },
    deleteSupplier: (id: number) => {
        return axios.delete(`/auth/suppliers/${id}`);
    },
    reCalculateBalance: (id: number) => {
        return axios.put(`/auth/suppliers/${id}/re-calculate-balance`);
    },
};