import { defineStore } from 'pinia'
import { expenses } from '@/services/api'
import type { Pagination, Expense, Status } from '@/Types'
import { useAuthStore } from '.';

export const useExpensesStore = defineStore({
    id: 'expenses',
    state: () => ({
        expenses: [] as Expense[],
        expensesPagination: {
            currentPage: 0,
            firstPageUrl: '',
            lastPageUrl: '',
            nextPageUrl: '',
            prevPageUrl: '',
            lastPage: 0,
            perPage: 0,
            total: 0,
        } as Pagination,
        expensesStatus: {} as Status,
        expense: {} as Expense,
        expenseStatus: {} as Status,
    }),
    getters: {
        getExpenses(state) {
            return state.expenses;
        },
        getExpensesPagination(state) {
            return state.expensesPagination;
        },
        getExpensesStatus(state) {
            return state.expensesStatus;
        },
        getExpense(state) {
            return state.expense;
        },
        getExpenseStatus(state) {
            return state.expenseStatus;
        },
    },
    actions: {
        async fetchExpenses(page: number, search = "" , from="" , to="") {
            this.clearExpensesStatus();
            this.expensesStatus.loading = true;
            this.expenses = [];
            try {
                const { data } = await expenses.getExpenses(page, search , from , to);
                this.expenses = data.data.data;
                this.expensesPagination = {
                    currentPage: data.data.current_page,
                    firstPageUrl: data.data.first_page_url,
                    lastPageUrl: data.data.last_page_url,
                    nextPageUrl: data.data.next_page_url,
                    prevPageUrl: data.data.prev_page_url,
                    lastPage: data.data.last_page,
                    perPage: data.data.per_page,
                    total: data.data.total,
                }
                this.expensesStatus.success = true;
                this.expensesStatus.loading = false;
            }
            catch (error) {
                this.handleExpensesError(error);
            }
            finally {
                this.expensesStatus.loading = false;
            }
        },
        async fetchExpense(id: number) {
            this.clearExpenseStatus();
            this.expenseStatus.loading = true;
            this.expense = {} as Expense;
            try {
                const { data } = await expenses.getExpense(id);
                this.expense = data.data;
                this.expenseStatus.success = true;
                this.expenseStatus.loading = false;
            }
            catch (error) {
                this.handleExpenseError(error);
            }
            finally {
                this.expenseStatus.loading = false;
            }
        },
        async createExpense(data: Expense) {
            this.clearExpenseStatus();
            this.expenseStatus.loading = true;
            try {
                const { data: expense } = await expenses.createExpense(data);
                this.expense = expense.data;
                this.expenses.unshift(expense.data);
                this.expenseStatus.success = true;
                this.expenseStatus.loading = false;
            }
            catch (error) {
                this.handleExpenseError(error);
            }
            finally {
                this.expenseStatus.loading = false;
            }
        },
        async downloadReport(search = "" , from="" , to="") {
            this.clearExpensesStatus();
            this.expensesStatus.loading = true;
            try {
                const { data } = await expenses.printExpenses(search , from , to);
                const url = window.URL.createObjectURL(new Blob([data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'الصرفيات.xlsx');
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                window.URL.revokeObjectURL(url);
                this.expensesStatus.success = true;
                this.expensesStatus.loading = false;
            }
            catch (error) {
                this.handleExpensesError(error);
            }
            finally {
                this.expensesStatus.loading = false;
            }
        },
        // async updateExpense(data: Expense) {
        //     this.clearExpenseStatus();
        //     this.expenseStatus.loading = true;
        //     try {
        //         const { data:expense } = await expenses.updateExpense(data);
        //         this.expense = expense.data;
        //         this.expenses.unshift(expense.data);
        //         this.expenseStatus.success = true;
        //         this.expenseStatus.loading = false;
        //     }
        //     catch (error) {
        //         this.handleExpenseError(error);
        //     }
        //     finally {
        //         this.expenseStatus.loading = false;
        //     }
        // },
        clearExpensesStatus() {
            this.expensesStatus = {} as Status;
        },
        clearExpenseStatus() {
            this.expenseStatus = {} as Status;
        },
        handleExpensesError(error: any) {
            this.expensesStatus.error = true;
            if (!error.response) {
                this.expensesStatus.message = 'حدث خطأ في الشبكة'
            }
            if (error.response.status === 500) {
                this.expensesStatus.message = 'حدث خطأ في الخادم'
            }
            this.expensesStatus.message = 'حدث خطأ ما'
            throw error;
        },
        handleExpenseError(error: any) {
            this.expenseStatus.error = true;
            if (!error.response) {
                this.expenseStatus.message = 'حدث خطأ في الشبكة'
            }
            if (error.response.status === 500) {
                this.expenseStatus.message = 'حدث خطأ في الخادم'
            }
            this.expenseStatus.message = 'حدث خطأ ما'
            throw error;
        },
    },
})