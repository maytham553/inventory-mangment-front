import { purchases } from '@/services/api'
import { calculateDiscountPercentage, calculateSubtotal, calculateTotal, sumTotal } from '@/services/helper/helperFunctions'
import { defineStore } from 'pinia'
import type { Status, Pagination, Purchase, PurchaseRawMaterial, RawMaterial, } from '@/Types'
export const usePurchasesStore = defineStore('purchases', {
    state: () => ({
        purchases: [] as Purchase[],
        purchase: {
            raw_materials: [] as PurchaseRawMaterial[],
            status: 'confirmed' as Purchase['status'],
            discount_amount: 0,
            discount_percentage: 0,
            total_amount: 0,
            subtotal_amount: 0,
        } as Purchase,
        purchaseStatus: {
            loading: false,
            error: false,
            success: false,
            message: '',
        } as Status,
        purchasesStatus: {
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
        getPurchases: (state) => state.purchases,
        getPurchase: (state) => state.purchase,
        getPurchaseFromPurchases: (state) => (id: number) => {
            return state.purchases.find((purchase) => purchase.id === id)
        },
    },
    actions: {
        async fetchPurchases(page = 1) {
            this.clearPurchasesStatus();
            try {
                this.purchasesStatus.loading = true
                const { data: response } = await purchases.getPurchases(page)
                this.purchases = response.data.data
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
                this.purchasesStatus.success = true
            } catch (error) {
                this.handlePurchasesError(error)
                throw error
            }
            finally {
                this.purchasesStatus.loading = false
            }
        },
        async fetchPurchasesBySupplier(page: number, id: number, search = "") {
            this.clearPurchasesStatus();
            try {
                this.purchasesStatus.loading = true
                const { data: response } = await purchases.getPurchasesBySupplier(page, id, search)
                this.purchases = response.data.data.map((purchase: any) => {
                    return {
                        ...purchase,
                        raw_materials: purchase.raw_materials.map((rawMaterial: any) => {
                            const flattenedRawMaterial = { ...rawMaterial, ...rawMaterial.pivot };
                            delete flattenedRawMaterial.pivot;
                            return flattenedRawMaterial;
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
                this.purchasesStatus.success = true
            } catch (error) {
                this.handlePurchasesError(error)
                throw error
            }
            finally {
                this.purchasesStatus.loading = false
            }
        },
        async createPurchase(purchase: Purchase) {
            this.clearPurchaseStatus();
            try {
                this.purchaseStatus.loading = true
                const { data: response } = await purchases.createPurchase(purchase)
                this.purchases.unshift({
                    ...response.data,
                    raw_materials: purchase.raw_materials
                })
                this.purchaseStatus.success = true
            } catch (error) {
                this.handlePurchaseError(error)
                throw error
            } finally {
                this.purchaseStatus.loading = false
            }
        },
        async updatePurchase(purchase: Purchase) {
            this.clearPurchaseStatus();
            try {
                this.purchaseStatus.loading = true
                const { data: response } = await purchases.updatePurchase(purchase.id, purchase)
                this.purchaseStatus.success = true
            } catch (error) {
                this.handlePurchaseError(error)
                throw error
            } finally {
                this.purchaseStatus.loading = false
            }
        },
        addRawMaterialToPurchase(rawMaterial: RawMaterial) {
            const id = rawMaterial.id;
            const rawMaterialIndex = this.purchase.raw_materials.findIndex((rawMaterial) => rawMaterial.raw_material_id === id)
            // if (rawMaterialIndex !== -1) {
            //     this.purchase.raw_materials[rawMaterialIndex].quantity! += 1
            // } else {
                const purchaseRawMaterial: PurchaseRawMaterial = {
                    ...rawMaterial,
                    raw_material_id: rawMaterial.id,
                    quantity: 1,
                    purchase_id: this.purchase.id,
                    subtotal: rawMaterial.cost,
                    total: rawMaterial.cost,
                    unit_price: rawMaterial.cost,
                    discount_amount: 0,
                    discount_percentage: 0,
                }
                this.purchase.raw_materials.push(purchaseRawMaterial)
            // }
        },
        removeRawMaterialFromPurchase(id: number) {
            const rawMaterialIndex = this.purchase.raw_materials.findIndex((rawMaterial) => rawMaterial.raw_material_id === id)
            if (rawMaterialIndex !== -1) {
                this.purchase.raw_materials.splice(rawMaterialIndex, 1)
            }
        },
        setPurchase(purchase: Purchase) {
            this.purchase = purchase
        },
        handlePurchasesError(error: any) {
            this.purchasesStatus.error = true
            if (!error.response) {
                this.purchasesStatus.message = 'حدث خطأ في الشبكة'
            } else if (error.response.status === 500) {
                this.purchasesStatus.message = 'حدث خطأ في الخادم';
            } else {
                this.purchasesStatus.message = 'حدث خطأ ما'
            }
        },

        reCalculatePurchaseAfterChange() {
            const initialNumber = Number();
            if (this.purchase.raw_materials && this.purchase.raw_materials.length > 0) {
                this.purchase.raw_materials.forEach((rawMaterial: any) => {
                    if (rawMaterial.discount_amount) {
                        rawMaterial.discount_percentage = calculateDiscountPercentage(rawMaterial.subtotal, rawMaterial.discount_amount, 1);
                    }
                    if (rawMaterial.quantity) {
                        rawMaterial.subtotal = calculateSubtotal(rawMaterial.quantity, rawMaterial.unit_price, 1);
                        rawMaterial.total = calculateTotal(rawMaterial.subtotal, rawMaterial.discount_amount, 1);
                        rawMaterial.discount_percentage = calculateDiscountPercentage(rawMaterial.subtotal, rawMaterial.discount_amount, 1);
                    }
                });
                const total = sumTotal(this.purchase.raw_materials, 'total');
                const subtotal = sumTotal(this.purchase.raw_materials, 'subtotal');
                this.purchase.total_amount = total
                this.purchase.subtotal_amount = subtotal
                if (this.purchase.discount_amount) {
                    this.purchase.discount_percentage = parseInt(((this.purchase.discount_amount / this.purchase.subtotal_amount) * 100).toFixed(1));
                    this.purchase.total_amount = total - this.purchase.discount_amount;
                } else {
                    this.purchase.discount_amount = initialNumber;
                    this.purchase.discount_percentage = initialNumber;
                }
            } else {
                this.purchase.total_amount = initialNumber;
                this.purchase.subtotal_amount = initialNumber;
                this.purchase.discount_amount = initialNumber;
                this.purchase.discount_percentage = initialNumber;
            }
        },
        handlePurchaseError(error: any) {
            this.purchaseStatus.error = true
            if (!error.response) {
                this.purchaseStatus.message = 'حدث خطأ في الشبكة'
            } else if (error.response.status === 500) {
                this.purchaseStatus.message = 'حدث خطأ في الخادم';
            } else {
                this.purchaseStatus.message = 'حدث خطأ ما'
            }
        },
        clearPurchasesStatus() {
            this.purchasesStatus = {
                loading: false,
                error: false,
                success: false,
                message: '',
            }
        },
        clearPurchaseStatus() {
            this.purchaseStatus = {
                loading: false,
                error: false,
                success: false,
                message: '',
            }
        },
        setInitialPurchase() {
            this.purchase = {
                raw_materials: [] as PurchaseRawMaterial[],
                status: 'confirmed' as Purchase['status'],
                supplier_id: this.purchase.supplier_id,
            } as Purchase
        }

    }

})




