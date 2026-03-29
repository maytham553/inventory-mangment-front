import type { Product } from '@/Types';
import axios from './axios';

export const products = {

    getProducts: (page: number, search = '') => {
        return axios.get(
            '/auth/products?page=' + page + '&search=' + encodeURIComponent(search)
        );
    },
    /** Full list for sale/invoice picker (see route `products.sale-picker`). */
    getProductsSalePicker: () => {
        return axios.get('/auth/products/sale-picker');
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


