import { sales, customers } from '@/services/api'
import {  calculateDiscountPercentage, calculateSubtotal, calculateTotal, sumTotal } from '@/services/helper/helperFunctions'
import { defineStore } from 'pinia'
import type { Sale, Status, Pagination, Product, SaleProduct } from '@/Types'


export const useSalesStore = defineStore('sales', {
    state: () => ({
        sales: [] as Sale[],
        sale: {
            products: [] as SaleProduct[],
            status: 'confirmed' as Sale['status'],
            discount_amount: 0,
            discount_percentage: 0,
            total_amount: 0,
            subtotal_amount: 0,
        } as Sale,
        saleStatus: {
            loading: false,
            success: false,
            error: false,
            message: '',
        } as Status,
        salesStatus: {
            loading: false,
            success: false,
            error: false,
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
        } as Pagination,
    }),

    getters: {
        getSales: (state) => state.sales,
        getSale: (state) => state.sale,
        getSaleFromSales: (state) => (id: number) => {
            return state.sales.find((sale) => sale.id === id)
        },
    },
    actions: {
        async fetchSalesOfCustomer(page = 1, id: number, search = "") {
            this.clearSalesStatus();
            try {
                this.salesStatus.loading = true;
                const { data: response } = await customers.getCustomerSales(id, page, search);
                this.sales = response.data.data.map((sale: any) => {
                    return {
                        ...sale,
                        products: sale.products.map((product: any) => {
                            const flattenedProduct = { ...product, ...product.pivot };
                            delete flattenedProduct.pivot;
                            return flattenedProduct;
                        }),
                    };
                });
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
                this.salesStatus.success = true;
            } catch (error) {
                this.handleSalesError(error);
                throw error;
            } finally {
                this.salesStatus.loading = false;
            }
        },
        async createSale(sale: Sale) {
            this.clearSaleStatus();
            try {
                this.saleStatus.loading = true;
                const { data: response } = await sales.createSale(sale);
                this.sale = {
                    ...response.data,
                    products: sale.products
                };
                this.sales.unshift({
                    ...response.data,
                    products: sale.products
                })
                this.saleStatus.success = true;
            } catch (error) {
                this.handleSaleError(error);
                throw error;
            } finally {
                this.saleStatus.loading = false;
            }
        },
        async updateSale(sale: Sale) {
            this.clearSaleStatus();
            try {
                this.saleStatus.loading = true;
                const { data: response } = await sales.updateSale(sale.id, sale);
                this.saleStatus.success = true;
            } catch (error) {
                this.handleSaleError(error);
                throw error;
            } finally {
                this.saleStatus.loading = false;
            }
        },

        addProductToSale(product: Product) {
            const id = product.id;
            const productIndex = this.sale.products.findIndex((product) => product.id === id);
            if (productIndex !== -1) {
                this.sale.products[productIndex].quantity! += 1;
            } else {
                const saleProduct: SaleProduct = {
                    ...product,
                    product_id: product.id,
                    quantity: 1,
                    sale_id: this.sale.id,
                    subtotal: product.price,
                    total: product.price,
                    unit_price: product.price,
                    discount_amount: 0,
                    discount_percentage: 0,
                }
                this.sale.products.push(saleProduct);
            }
        },

        removeProductFromSale(id: number) {
            const productIndex = this.sale.products.findIndex((product) => product.product_id === id);
            if (productIndex !== -1) {
                this.sale.products.splice(productIndex, 1);
            }
        },

        setSale(sale: Sale) {
            this.sale = sale;
        },

        setInitialSale() {
            this.sale = {
                products: [] as SaleProduct[],
                status: 'confirmed' as Sale['status'],
                discount_amount: 0,
                discount_percentage: 0,
                customer_id: this.sale.customer_id,
            } as Sale;
        },

        reCalculateSaleAfterChange() {
            const initialNumber = Number();
            if (this.sale.products && this.sale.products.length > 0) {
                this.sale.products.forEach((product: SaleProduct) => {
                    if (product.discount_amount) {
                        product.discount_percentage = calculateDiscountPercentage(product.subtotal, product.discount_amount, 1);
                    }
                    if (product.quantity) {
                        product.subtotal = calculateSubtotal(product.quantity, product.unit_price, 1);
                        product.total = calculateTotal(product.subtotal, product.discount_amount, 1);
                        product.discount_percentage = calculateDiscountPercentage(product.subtotal, product.discount_amount, 1);
                    }
                });
                const total = sumTotal(this.sale.products, 'total');
                const subtotal = sumTotal(this.sale.products, 'subtotal');
                this.sale.total_amount = total
                this.sale.subtotal_amount = subtotal
                if (this.sale.discount_amount) {
                    this.sale.discount_percentage = calculateDiscountPercentage(this.sale.subtotal_amount, this.sale.discount_amount, 1);
                    this.sale.total_amount = total - this.sale.discount_amount;
                } else {
                    this.sale.discount_amount = initialNumber;
                    this.sale.discount_percentage = initialNumber;
                }
            } else {
                this.sale.total_amount = initialNumber;
                this.sale.subtotal_amount = initialNumber;
                this.sale.discount_amount = initialNumber;
                this.sale.discount_percentage = initialNumber;
            }
        },
        clearSalesStatus() {
            this.salesStatus = {
                loading: false,
                error: false,
                success: false,
                message: '',
            }
        },
        clearSaleStatus() {
            this.saleStatus = {
                loading: false,
                error: false,
                success: false,
                message: '',
            }
        },
        handleSalesError(error: any) {
            this.salesStatus.error = true;
            if (!error.response) {
                this.salesStatus.message = 'حدث خطأ في الشبكة'
            } else if (error.response.status === 500) {
                this.salesStatus.message = 'حدث خطأ في الخادم';
            } else {
                this.salesStatus.message = 'حدث خطأ ما'
            }
        },
        handleSaleError(error: any) {
            this.saleStatus.error = true;
            if (!error.response) {
                this.saleStatus.message = 'حدث خطأ في الشبكة'
            } else if (error.response.status === 500) {
                this.saleStatus.message = 'حدث خطأ في الخادم';
            } else {
                this.saleStatus.message = 'حدث خطأ ما'
            }
        },
    }
})