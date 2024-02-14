import axios from './axios';
import type { CustomerTransaction, SupplierTransaction } from '@/Types';

const customerTransactions = {
    getCustomersTransactions: (page: number) => {
        return axios.get(`/auth/customer-transactions?page=${page}`);
    },
    getCustomerTransactions: (id: number, page: number) => {
        return axios.get(`/auth/customer-transactions/customer/${id}?page=${page}`);
    },
    createCustomerTransaction: (data: CustomerTransaction) => {
        return axios.post(`/auth/customer-transactions`, data);
    },
    updateCustomerTransaction: (id: number, data: CustomerTransaction) => {
        return axios.put(`/auth/customer-transactions/${id}`, data);
    },
    deleteCustomerTransaction: (id: number) => {
        return axios.delete(`/auth/customer-transactions/${id}`);
    },
    getCustomerTransactionsWithDate: (id: number, page: number, from: string, to: string) => {
        return axios.get(`/auth/customers/${id}/transactions?from=${from}&to=${to} &page=${page}`);
    },
};


const supplierTransactions = {
    getSuppliersTransactions: (page: number) => {
        return axios.get(`/auth/supplier-transactions?page=${page}`);
    },
    getSupplierTransactions: (id: number, page: number, from = '', to = '') => {
        return axios.get(`/auth/supplier-transactions/supplier/${id}?page=${page}&from=${from}&to=${to}`);
    },
    createSupplierTransaction: (data: SupplierTransaction) => {
        return axios.post(`/auth/supplier-transactions`, data);
    },
    updateSupplierTransaction: (id: number, data: SupplierTransaction) => {
        return axios.put(`/auth/supplier-transactions/${id}`, data);
    },
    deleteSupplierTransaction: (id: number) => {
        return axios.delete(`/auth/supplier-transactions/${id}`);
    },
    getSupplierTransactionsWithDate: (id: number, page: number, from: string, to: string) => {
        return axios.get(`/auth/suppliers/${id}/transactions?from=${from}&to=${to} &page=${page}`);
    },
}

export const transactions = {
    ...customerTransactions,
    ...supplierTransactions,
};


