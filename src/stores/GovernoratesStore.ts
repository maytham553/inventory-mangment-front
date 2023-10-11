import { defineStore } from 'pinia'
import { governorates } from '@/services/api'
import type { Governorate } from '@/Types'

export const useGovernoratesStore = defineStore('governorates', {
    state: () => ({
        governorates: [] as Governorate[],
    }),
    getters: {
        getGovernorates: (state) => state.governorates,
        getGovernorateById: (state) => (id: number) => {
            return state.governorates.find((governorate) => governorate.id === id)
        }
    },
    actions: {
        async fetchGovernorates() {
            try {
                if (this.governorates.length > 0) {
                    return
                }
                const response = await governorates.getGovernorates()
                this.governorates = response.data.data
            } catch (error: any) {
                throw error
            }
        },
    },
})
