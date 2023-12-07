import { TransactionType } from './../Types/Transaction';
import { defineStore } from 'pinia'
import { customers } from '@/services/api'
import type { Customer, Status, Pagination } from '@/Types'

export const useCustomersStore = defineStore('customers', {
    state: () => ({
        customers: [] as Customer[],
        customer: {} as Customer,
        initialCustomer: {} as Customer,
        customerStatus: {
            loading: false,
            error: false,
            success: false,
            message: '',
        } as Status,
        customersStatus: {
            loading: false,
            error: false,
            success: false,
            message: '',
        } as Status,
        pagination: {
            currentPage: 0,
            firstPageUrl: '',
            lastPageUrl: '',
            nextPageUrl: '',
            prevPageUrl: '',
            lastPage: 0,
            perPage: 0,
            total: 0,
        } as Pagination
    }),
    getters: {
        getCustomers: (state) => state.customers,
        getCustomer: (state) => state.customer,
        getCustomerFromCustomers: (state) => (id: number) => {
            return state.customers.find((customer) => customer.id === id)
        },
        getCustomerStatus: (state) => state.customerStatus,
        getCustomersStatus: (state) => state.customersStatus,
    },
    actions: {
        async fetchCustomers(page = 1 , search="") {
            this.clearCustomersStatus();
            try {
                this.customersStatus.loading = true
                const response = await customers.getCustomers(page , search)
                this.customers = response.data.data.data
                this.pagination = {
                    currentPage: response.data.data.current_page,
                    firstPageUrl: response.data.data.first_page_url,
                    lastPageUrl: response.data.data.last_page_url,
                    nextPageUrl: response.data.data.next_page_url,
                    prevPageUrl: response.data.data.prev_page_url,
                    lastPage: response.data.data.last_page,
                    perPage: response.data.data.per_page,
                    total: response.data.data.total,
                }
                this.customersStatus.success = true
                this.customersStatus.loading = false
                this.customersStatus.error = false
            } catch (error: any) {
                this.handleCustomersError(error)
                throw error
            }
        },
        async fetchCustomer(id: number) {
            this.clearCustomerStatus();
            try {
                this.customerStatus.loading = true
                const response = await customers.getCustomer(id)
                this.customer = response.data.data
                this.customerStatus.success = true
                this.customerStatus.loading = false
                this.customerStatus.error = false
            } catch (error: any) {
                this.handleCustomerError(error)
                throw error
            }
        },
        async createCustomer(data: Customer) {
            this.clearCustomerStatus();
            try {
                this.customerStatus.loading = true
                const response = await customers.createCustomer(data)
                this.customer = response.data.data
                this.customerStatus.success = true
                this.customerStatus.loading = false
                this.customerStatus.error = false
            } catch (error: any) {
                this.handleCustomerError(error)
                throw error
            }
        },
        async updateCustomer(id: number, customer: Customer) {
            this.clearCustomerStatus();
            try {
                this.customerStatus.loading = true
                const response = await customers.updateCustomer(id, customer)
                this.customer = response.data.data;
                this.customers = this.customers.map((customer) => {
                    if (customer.id === this.customer.id) {
                        return this.customer
                    }
                    return customer
                })
                this.customerStatus.success = true
                this.customerStatus.loading = false
                this.customerStatus.error = false
            } catch (error: any) {
                this.handleCustomerError(error)
                throw error
            }
        },
        async deleteCustomer(id: number) {
            this.clearCustomerStatus();
            try {
                this.customerStatus.loading = true
                const response = await customers.deleteCustomer(id)
                this.customer = response.data.data
                this.customers = this.customers.filter((customer) => customer.id !== id)
                this.customerStatus.success = true
                this.customerStatus.loading = false
                this.customerStatus.error = false
            } catch (error: any) {
                this.handleCustomerError(error)
                throw error
            }
        },
        async reCalculateBalance(id: number) {
            this.clearCustomerStatus();
            try {
                this.customerStatus.loading = true
                const response = await customers.reCalculateBalance(id)
                this.customer.balance = response.data.data
                this.customerStatus.success = true
                this.customerStatus.loading = false
                this.customerStatus.error = false
            } catch (error: any) {
                this.handleCustomerError(error)
                throw error
            }
        },
        async setCustomer(customer: Customer) {
            this.customer = customer
        },
        clearCustomerStatus() {
            this.customerStatus = {
                loading: false,
                error: false,
                success: false,
                message: '',
            } as Status
        },
        clearCustomersStatus() {
            this.customersStatus = {
                loading: false,
                error: false,
                success: false,
                message: '',
            } as Status
        },
        updateBalance(id: number, balance: number, type: TransactionType) {
            // if (this.customer.id === id) {
            //     if (type === 'credit') {
            //         this.customer.balance! = balance + this.customer.balance!
            //     } else {
            //         this.customer.balance! = parseInt(balance) - parseInt(this.customer.balance!)
            //     }
            // }
            this.reCalculateBalance(id)
        },
        handleCustomerError(error: any) {
            this.customerStatus.error = true
            this.customerStatus.loading = false
            if (!error.response) {
                this.customerStatus.message = 'حدث خطأ في الشبكة'
                return
            }
            if (error.response.status === 500) {
                this.customerStatus.message = 'حدث خطأ في الخادم'
                return
            }
            this.customerStatus.message = 'حدث خطأ ما'
        },
        handleCustomersError(error: any) {
            this.customersStatus.error = true
            this.customersStatus.loading = false
            if (!error.response) {
                this.customersStatus.message = 'حدث خطأ في الشبكة'
                return
            }

            if (error.response.status === 500) {
                this.customersStatus.message = 'حدث خطأ في الخادم'
                return
            }
            this.customersStatus.message = 'حدث خطأ ما'
        }
    },
})