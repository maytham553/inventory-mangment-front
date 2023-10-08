import { TransactionType } from './../Types/Transaction';
import { defineStore } from 'pinia'
import { transactions } from '@/services/api'
import type { Pagination, SupplierTransaction, Status } from '@/Types'
import { useSuppliersStore } from '.';


export const useSupplierTransactionsStore = defineStore({
    id: 'suppliersTransactions',
    state: () => ({
        supplierTransactions: [] as SupplierTransaction[],
        supplierTransactionsPagination: {
            currentPage: 0,
            firstPageUrl: '',
            lastPageUrl: '',
            nextPageUrl: '',
            prevPageUrl: '',
            lastPage: 0,
            perPage: 0,
            total: 0,
        } as Pagination,
        supplierTransactionsStatus: {} as Status,
        supplierTransaction: {} as SupplierTransaction,
        supplierTransactionStatus: {} as Status,
    }),
    getters: {
        getSupplierTransactions(state) {
            return state.supplierTransactions;
        },
        getSupplierTransactionsPagination(state) {
            return state.supplierTransactionsPagination;
        },
        getSupplierTransactionsStatus(state) {
            return state.supplierTransactionsStatus;
        },
        getSupplierTransaction(state) {
            return state.supplierTransaction;
        },
        getSuppliersTransactionsStatus(state) {
            return state.supplierTransactionStatus;
        },
    },
    actions: {
        async fetchSupplierTransactionsBySupplierId(id: number, page: number) {
            this.clearSupplierTransactionsStatus();
            this.supplierTransactionsStatus.loading = true;
            this.supplierTransactions = [];
            try {
                const { data } = await transactions.getSupplierTransactions(id, page);
                this.supplierTransactions = data.data.data;
                this.supplierTransactionsPagination = {
                    currentPage: data.data.current_page,
                    firstPageUrl: data.data.first_page_url,
                    lastPageUrl: data.data.last_page_url,
                    nextPageUrl: data.data.next_page_url,
                    prevPageUrl: data.data.prev_page_url,
                    lastPage: data.data.last_page,
                    perPage: data.data.per_page,
                    total: data.data.total,
                }
                this.supplierTransactionsStatus.success = true;
                this.supplierTransactionsStatus.loading = false;
            } catch (error) {
                this.handleSupplierTransactionsError(error);
            }
        },
        async createSupplierTransaction(data: SupplierTransaction) {
            this.clearSupplierTransactionStatus();
            this.supplierTransactionStatus.loading = true;
            try {
                const { data: transaction } = await transactions.createSupplierTransaction(data);
                const supplierStore = useSuppliersStore();
                supplierStore.updateBalance(data.supplier_id, data.amount, data.type);
                this.supplierTransactions.unshift(transaction.data);
                this.supplierTransactionStatus.success = true;
                this.supplierTransactionStatus.loading = false;
            } catch (error) {
                this.handleSupplierTransactionError(error);
            }
        },
        async updateSupplierTransaction(id: number, data: SupplierTransaction) {
            this.clearSupplierTransactionStatus();
            this.supplierTransactionStatus.loading = true;
            try {
                const { data: transaction } = await transactions.updateSupplierTransaction(id, data);
                this.supplierTransaction = transaction.data;
                this.supplierTransactionStatus.success = true;
                this.supplierTransactionStatus.loading = false;
            } catch (error) {
                this.handleSupplierTransactionError(error);
            }
        },
        async deleteSupplierTransaction(id: number) {
            this.clearSupplierTransactionStatus();
            this.supplierTransactionStatus.loading = true;
            try {
                await transactions.deleteSupplierTransaction(id);
                this.supplierTransactions = this.supplierTransactions.filter((transaction) => transaction.id !== id);
                this.supplierTransactionStatus.success = true;
                this.supplierTransactionStatus.loading = false;
            } catch (error) {
                this.handleSupplierTransactionError(error);
            }
        },
        clearSupplierTransactionsStatus() {
            this.supplierTransactionsStatus = {} as Status;
        },
        clearSupplierTransactionStatus() {
            this.supplierTransactionStatus = {} as Status;
        },
        setSupplierTransaction(transaction: SupplierTransaction) {
            this.supplierTransaction = transaction;
        },
        handleSupplierTransactionsError(error: any) {
            this.supplierTransactionsStatus.error = true;
            if (!error.response) {
                this.supplierTransactionsStatus.message = 'حدث خطأ في الشبكة'
                return
            }

            if (error.response.status === 500) {
                this.supplierTransactionsStatus.message = 'حدث خطأ في الخادم'
                return
            }
            this.supplierTransactionsStatus.message = 'حدث خطأ ما'
        },
        handleSupplierTransactionError(error: any) {
            this.supplierTransactionStatus.error = true;
            if (!error.response) {
                this.supplierTransactionStatus.message = 'حدث خطأ في الشبكة'
            }
            if (error.response.status === 500) {
                this.supplierTransactionStatus.message = 'حدث خطأ في الخادم'
            }
            this.supplierTransactionStatus.message = 'حدث خطأ ما'
            throw error;
        }
    }
})




