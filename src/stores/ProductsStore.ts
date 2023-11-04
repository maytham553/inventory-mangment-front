import { defineStore } from 'pinia'
import { products } from '@/services/api'
import type { Product, Status, Pagination } from '@/Types'


export const useProductsStore = defineStore('products', {
    state: () => ({
        products: [] as Product[],
        product: {} as Product,
        initialProduct: {} as Product,
        productStatus: {} as Status,
        productsStatus: {} as Status,
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
        getProducts: (state) => state.products,
        getProduct: (state) => state.product,
        getProductFromProducts: (state) => (id: number) => {
            return state.products.find((product) => product.id === id)
        },
        getProductStatus: (state) => state.productStatus,
        getProductsStatus: (state) => state.productsStatus,
    },
    actions: {
        async fetchProducts(page = 1) {
            this.clearProductsStatus();
            try {
                this.productsStatus.loading = true
                const { data: response } = await products.getProducts(page)
                this.products = response.data.data
                this.pagination = {
                    currentPage: response.data.current_page,
                    firstPageUrl: response.data.first_page_url,
                    lastPageUrl: response.data.last_page_url,
                    nextPageUrl: response.data.next_page_url,
                    prevPageUrl: response.data.prev_page_url,
                    lastPage: response.data.last_page,
                    perPage: response.data.per_page,
                    total: response.data.total,
                }
                this.productsStatus.success = true
            } catch (error) {
                this.handleProductsError(error)
                throw error
            } finally {
                this.productsStatus.loading = false
            }
        },
        async createProduct(product: Product) {
            this.clearProductStatus();
            try {
                this.productStatus.loading = true
                const { data: response } = await products.createProduct(product)
                this.products.unshift(response.data)
                this.product = response.data
                this.productStatus.success = true
            } catch (error) {
                this.handleProductError(error)
                throw error
            } finally {
                this.productStatus.loading = false
            }
        },
        async updateProduct(id: number, product: Product) {
            this.clearProductStatus();
            try {
                this.productStatus.loading = true
                const { data: response } = await products.updateProduct(id, product)
                this.product = response.data
                this.products = this.products.map((product) => {
                    if (product.id === this.product.id) {
                        return this.product
                    }
                    return product
                })
                this.productStatus.success = true
            } catch (error) {
                this.handleProductError(error)
                throw error
            } finally {
                this.productStatus.loading = false
            }
        },
        async deleteProduct(id: number) {
            this.clearProductStatus();
            try {
                this.productStatus.loading = true
                await products.deleteProduct(id)
                this.products = this.products.filter((product) => product.id !== id)
                this.productStatus.success = true
            } catch (error) {
                this.handleProductError(error)
                throw error
            } finally {
                this.productStatus.loading = false
            }
        },
        clearProductsStatus() {
            this.productsStatus = {
                loading: false,
                success: false,
                error: false,
                message: '',
            } as Status;
        },
        clearProductStatus() {
            this.productStatus = {
                loading: false,
                success: false,
                error: false,
                message: '',
            } as Status;
        },
        setProduct(product: Product) {
            this.product = product;
        },
        handleProductsError(error: any) {
            this.productsStatus.error = true;
            if (!error.response) {
                this.productsStatus.message = 'حدث خطأ في الشبكة'
                return
            } else if (error.response.status === 500) {
                this.productsStatus.message = 'حدث خطأ في الخادم'
                return
            }
            this.productsStatus.message = 'حدث خطأ ما'

        },
        handleProductError(error: any) {
            this.productStatus.error = true;
            if (!error.response) {
                this.productStatus.message = 'حدث خطأ في الشبكة'
            } else if (error.response.status === 500) {
                this.productStatus.message = 'حدث خطأ في الخادم'
            } else if (error.response.data.errors.barcode) {
                this.productStatus.message = 'هذا الباركود مستخدم من قبل'
            } else if (error.response.data.errors.code) {
                this.productStatus.message = 'هذا الكود مستخدم من قبل'
            } else {
                this.productStatus.message = 'حدث خطأ ما'
            }
        },
    }
})