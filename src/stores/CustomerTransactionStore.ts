import { defineStore } from 'pinia'
import { transactions } from '@/services/api'
import type { Pagination, CustomerTransaction, Status } from '@/Types'
import { useCustomersStore } from '.';

export const useCustomerTransactionsStore = defineStore({
    id: 'customersTransactions',
    state: () => ({
        customerTransactions: [] as CustomerTransaction[],
        customerTransactionsPagination: {
            currentPage: 0,
            firstPageUrl: '',
            lastPageUrl: '',
            nextPageUrl: '',
            prevPageUrl: '',
            lastPage: 0,
            perPage: 0,
            total: 0,
        } as Pagination,
        customerTransactionsStatus: {} as Status,
        customerTransaction: {} as CustomerTransaction,
        customerTransactionStatus: {} as Status,
    }),
    getters: {
        getCustomerTransactions(state) {
            return state.customerTransactions;
        },
        getCustomerTransactionsPagination(state) {
            return state.customerTransactionsPagination;
        },
        getCustomerTransactionsStatus(state) {
            return state.customerTransactionsStatus;
        },
        getCustomerTransaction(state) {
            return state.customerTransaction;
        },
        getCustomersTransactionsStatus(state) {
            return state.customerTransactionStatus;
        },
    },
    actions: {
        async fetchCustomerTransactionsByCustomerId(id: number, page: number) {
            this.clearCustomerTransactionsStatus();
            this.customerTransactionsStatus.loading = true;
            this.customerTransactions = [];
            try {
                const { data } = await transactions.getCustomerTransactions(id, page);
                this.customerTransactions = data.data.data;
                this.customerTransactionsPagination = {
                    currentPage: data.data.current_page,
                    firstPageUrl: data.data.first_page_url,
                    lastPageUrl: data.data.last_page_url,
                    nextPageUrl: data.data.next_page_url,
                    prevPageUrl: data.data.prev_page_url,
                    lastPage: data.data.last_page,
                    perPage: data.data.per_page,
                    total: data.data.total,
                }
                this.customerTransactionsStatus.success = true;
                this.customerTransactionsStatus.loading = false;
            } catch (error) {
                this.handleCustomerTransactionsError(error);
            } finally {
                this.customerTransactionsStatus.loading = false;
            }
        },
        async createCustomerTransaction(data: CustomerTransaction) {
            this.clearCustomerTransactionStatus();
            this.customerTransactionStatus.loading = true;
            try {
                const { data: transaction } = await transactions.createCustomerTransaction(data);
                const customersStore = useCustomersStore();
                customersStore.updateBalance(data.customer_id, data.amount, data.type);
                this.customerTransactions.unshift(transaction.data);
                this.customerTransactionStatus.success = true;
                this.customerTransactionStatus.loading = false;
            } catch (error) {
                this.handleCustomerTransactionError(error);
            } finally {
                this.customerTransactionStatus.loading = false;
            }
        },

        clearCustomerTransactionsStatus() {
            this.customerTransactionsStatus = {} as Status;
        },
        clearCustomerTransactionStatus() {
            this.customerTransactionStatus = {} as Status;
        },
        handleCustomerTransactionsError(error: any) {
            this.customerTransactionsStatus.error = true;
            if (!error.response) {
                this.customerTransactionsStatus.message = 'حدث خطأ في الشبكة'
            }
            if (error.response.status === 500) {
                this.customerTransactionsStatus.message = 'حدث خطأ في الخادم'
            }
            this.customerTransactionsStatus.message = 'حدث خطأ ما'
            throw error;
        },
        handleCustomerTransactionError(error: any) {
            this.customerTransactionStatus.error = true;
            if (!error.response) {
                this.customerTransactionStatus.message = 'حدث خطأ في الشبكة'
            }
            if (error.response.status === 500) {
                this.customerTransactionStatus.message = 'حدث خطأ في الخادم'
            }
            this.customerTransactionStatus.message = 'حدث خطأ ما'
            throw error;
        },

    },

})