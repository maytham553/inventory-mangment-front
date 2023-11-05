import { TransactionType } from './../Types';
import { defineStore } from 'pinia'
import { suppliers } from '@/services/api'
import type { Supplier, Status, Pagination } from '@/Types'


export const useSuppliersStore = defineStore('suppliers', {
    state: () => ({
        suppliers: [] as Supplier[],
        supplier: {} as Supplier,
        initialSupplier: {} as Supplier,
        supplierStatus: {
            loading: false,
            error: false,
            success: false,
            message: '',
        } as Status,
        suppliersStatus: {
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
        getSuppliers: (state) => state.suppliers,
        getSupplier: (state) => state.supplier,
        getSupplierFromSuppliers: (state) => (id: number) => {
            return state.suppliers.find((supplier) => supplier.id === id)
        },
        getSupplierStatus: (state) => state.supplierStatus,
        getSuppliersStatus: (state) => state.suppliersStatus,
    },
    actions: {
        async fetchSuppliers(page = 1 , search = '') {
            this.clearSuppliersStatus();
            try {
                this.suppliersStatus.loading = true
                const response = await suppliers.getSuppliers(page , search)
                this.suppliers = response.data.data.data
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
                this.suppliersStatus.success = true
                this.suppliersStatus.loading = false
                this.suppliersStatus.error = false
            } catch (error: any) {
                this.handleSuppliersError(error)
                throw error
            }
        },
        async fetchSupplier(id: number) {
            this.clearSupplierStatus();
            try {
                this.supplierStatus.loading = true
                const response = await suppliers.getSupplier(id)
                this.supplier = response.data.data
                this.supplierStatus.success = true
                this.supplierStatus.loading = false
                this.supplierStatus.error = false
            }
            catch (error: any) {
                this.handleSupplierError(error)
                throw error
            }
        }
        ,
        async createSupplier(data: Supplier) {
            this.clearSupplierStatus();
            try {
                this.supplierStatus.loading = true
                const response = await suppliers.createSupplier(data)
                this.supplier = response.data.data
                this.supplierStatus.success = true
                this.supplierStatus.loading = false
                this.supplierStatus.error = false
            } catch (error: any) {
                this.handleSupplierError(error)
                throw error
            }
        },
        async updateSupplier(id: number, supplier: Supplier) {
            this.clearSupplierStatus();
            try {
                this.supplierStatus.loading = true
                const response = await suppliers.updateSupplier(id, supplier)
                this.supplier = response.data.data;
                this.suppliers = this.suppliers.map((supplier) => {
                    if (supplier.id === this.supplier.id) {
                        return this.supplier
                    }
                    return supplier
                })
                this.supplierStatus.success = true
                this.supplierStatus.loading = false
                this.supplierStatus.error = false
            } catch (error: any) {
                this.handleSupplierError(error)
                throw error
            }
        },
        async deleteSupplier(id: number) {
            this.clearSupplierStatus();
            try {
                this.supplierStatus.loading = true
                const response = await suppliers.deleteSupplier(id)
                this.supplier = response.data.data
                this.suppliers = this.suppliers.filter((supplier) => supplier.id !== id)
                this.supplierStatus.success = true
                this.supplierStatus.loading = false
                this.supplierStatus.error = false
            } catch (error: any) {
                this.handleSupplierError(error)
                throw error
            }
        },
        async reCalculateBalance(id: number) {
            this.clearSupplierStatus();
            try {
                this.supplierStatus.loading = true
                const response = await suppliers.reCalculateBalance(id)
                this.supplier.balance = response.data.data
            } catch (error: any) {
                this.handleSupplierError(error)
                throw error
            }
        },
        async setSupplier(supplier: Supplier) {
            this.supplier = supplier
        },
        clearSupplierStatus() {
            this.supplierStatus = {
                loading: false,
                error: false,
                success: false,
                message: '',
            } as Status
        },
        clearSuppliersStatus() {
            this.suppliersStatus = {
                loading: false,
                error: false,
                success: false,
                message: '',
            } as Status
        },
        updateBalance(id: number, amount: number, type: TransactionType) {
            if (this.supplier.id === id) {
                if (type === 'credit') {
                    this.supplier.balance! = parseInt(amount) + parseInt(this.supplier.balance!)
                } else {
                    this.supplier.balance! = parseInt(amount) - parseInt(this.supplier.balance!)
                }
            }
        },
        handleSupplierError(error: any) {
            this.supplierStatus.error = true
            this.supplierStatus.loading = false
            if (!error.response) {
                this.supplierStatus.message = 'حدث خطأ في الشبكة'
                return
            }
            if (error.response.status === 500) {
                this.supplierStatus.message = 'حدث خطأ في الخادم'
                return
            }
            this.supplierStatus.message = 'حدث خطأ ما'
        },
        handleSuppliersError(error: any) {
            this.suppliersStatus.error = true
            this.suppliersStatus.loading = false
            if (!error.response) {
                this.suppliersStatus.message = 'حدث خطأ في الشبكة'
                return
            }

            if (error.response.status === 500) {
                this.suppliersStatus.message = 'حدث خطأ في الخادم'
                return
            }
            this.suppliersStatus.message = 'حدث خطأ ما'
        }
    },
})

