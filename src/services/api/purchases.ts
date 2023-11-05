import type { Purchase } from '@/Types';
import axios from './axios';

export const purchases = {

    getPurchases: (page: number) => {
        return axios.get('/auth/purchases?page=' + page);
    },
    getPurchasesBySupplier: (page: number, id: number, search = "") => {
        return axios.get('/auth/purchases/supplier/' + id + '?page=' + page + '&search=' + search);
    },
    getPurchase: (id: number) => {
        return axios.get(`/auth/purchases/${id}`);
    },
    createPurchase: (data: Purchase) => {
        return axios.post('/auth/purchases', data);
    },
    updatePurchase: (id: number, data: Purchase) => {
        console.log(data);
        return axios.put(`/auth/purchases/${id}`, data);
    },
    deletePurchase: (id: number) => {
        return axios.delete(`/auth/purchases/${id}`);
    },
};