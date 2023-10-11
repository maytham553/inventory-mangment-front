import type { Product } from '@/Types';
import axios from './axios';

export const products = {

    getProducts: (page: number) => {
        return axios.get('/auth/products?page=' + page);
    },
    getProduct: (id: number) => {
        return axios.get(`/auth/products/${id}`);
    },
    createProduct: (data: Product) => {
        return axios.post('/auth/products', data);
    },
    updateProduct: (id: number, data: Product) => {
        console.log(data);
        return axios.put(`/auth/products/${id}`, data);
    },
    deleteProduct: (id: number) => {
        return axios.delete(`/auth/products/${id}`);
    },
};


