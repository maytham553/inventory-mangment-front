import { defineStore } from 'pinia'
import { rawMaterials } from '@/services/api'
import type { RawMaterial, Status, Pagination } from '@/Types'


export const useRawMaterialsStore = defineStore('rawMaterials', {
    state: () => ({
        rawMaterials: [] as RawMaterial[],
        rawMaterial: {} as RawMaterial,
        initialRawMaterial: {} as RawMaterial,
        rawMaterialStatus: {} as Status,
        rawMaterialsStatus: {} as Status,
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
        getRawMaterials: (state) => state.rawMaterials,
        getRawMaterial: (state) => state.rawMaterial,
        getRawMaterialFromRawMaterials: (state) => (id: number) => {
            return state.rawMaterials.find((rawMaterial) => rawMaterial.id === id)
        },
        getRawMaterialStatus: (state) => state.rawMaterialStatus,
        getRawMaterialsStatus: (state) => state.rawMaterialsStatus,
    },
    actions: {
        async fetchRawMaterials(page = 1) {
            this.clearRawMaterialsStatus();
            try {
                this.rawMaterialsStatus.loading = true
                const { data: response } = await rawMaterials.getRawMaterials(page)
                this.rawMaterials = response.data.data
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
                this.rawMaterialsStatus.success = true
            } catch (error) {
                this.handleRawMaterialsError(error)
                throw error
            } finally {
                this.rawMaterialsStatus.loading = false
            }
        },
        async createRawMaterial(rawMaterial: RawMaterial) {
            this.clearRawMaterialStatus();
            try {
                this.rawMaterialStatus.loading = true
                const { data: response } = await rawMaterials.createRawMaterial(rawMaterial)
                console.log(response.data)
                this.rawMaterials.unshift(response.data)
                this.rawMaterialStatus.success = true
            } catch (error) {
                this.handleRawMaterialError(error)
                throw error
            } finally {
                this.rawMaterialStatus.loading = false
            }
        },
        async updateRawMaterial(id: number, rawMaterial: RawMaterial) {
            this.clearRawMaterialStatus();
            try {
                this.rawMaterialStatus.loading = true
                const { data: response } = await rawMaterials.updateRawMaterial(id, rawMaterial)
                this.rawMaterials = this.rawMaterials.map((rawMaterial) => {
                    if (rawMaterial.id === id) {
                        return response.data
                    }
                    return rawMaterial
                })
                this.rawMaterialStatus.success = true
            } catch (error) {
                this.handleRawMaterialError(error)
                throw error
            } finally {
                this.rawMaterialStatus.loading = false
            }
        },
        async deleteRawMaterial(id: number) {
            this.clearRawMaterialStatus();
            try {
                this.rawMaterialStatus.loading = true
                await rawMaterials.deleteRawMaterial(id)
                this.rawMaterials = this.rawMaterials.filter((rawMaterial) => rawMaterial.id !== id)
                this.rawMaterialStatus.success = true
            } catch (error) {
                this.handleRawMaterialError(error)
                throw error
            } finally {
                this.rawMaterialStatus.loading = false
            }
        },
        clearRawMaterialStatus() {
            this.rawMaterialStatus = {
                loading: false,
                success: false,
                error: false,
                message: '',
            } as Status
        },
        clearRawMaterialsStatus() {
            this.rawMaterialsStatus = {
                loading: false,
                success: false,
                error: false,
                message: '',
            } as Status
        },
        setRawMaterial(rawMaterial: RawMaterial) {
            this.rawMaterial = rawMaterial
        },
        handleRawMaterialError(error: any) {
            this.rawMaterialStatus.error = true
            if (!error.response) {
                this.rawMaterialStatus.message = 'حدث خطأ في الشبكة'
            } else if (error.response.status === 500) {
                this.rawMaterialStatus.message = 'حدث خطأ في الخادم'
            } else if (error.response.data.errors.barcode) {
                this.rawMaterialStatus.message = 'هذا الباركود مستخدم من قبل'
            } else if (error.response.data.errors.code) {
                this.rawMaterialStatus.message = 'هذا الكود مستخدم من قبل'
            } else {
                this.rawMaterialStatus.message = 'حدث خطأ ما'
            }
        },
        handleRawMaterialsError(error: any) {
            this.rawMaterialsStatus.error = true
            if (!error.response) {
                console.log(error.response)
                this.rawMaterialsStatus.message = 'حدث خطأ في الشبكة'
            } else if (error.response.status === 500) {
                this.rawMaterialsStatus.message = 'حدث خطأ في الخادم';
            } else {
                this.rawMaterialsStatus.message = 'حدث خطأ ما'
            }
        },
    }
})
