import { defineStore } from 'pinia'
import type { User, Status } from '@/Types'
import router from '@/router'
import { users } from '@/services/api'

export const useUsersStore = defineStore('users', {
    state: () => ({
        users: [] as User[],
        user: null as User | null,
        status: {
            loading: false,
            error: false,
            success: false,
            message: '',
        } as Status,
    }),
    getters: {
        isLoggedIn: (state) => !!state.user,
    },
    actions: {
        async getUser(id: number) {
            try {
                this.status.loading = true
                const response = await users.getUser(id)
                this.user = response.data.data
                this.status.success = true
                this.status.loading = false
                this.status.error = false
            } catch (error: any) {
                this.handleError(error)
                throw error
            }
        },
        async handleError(error: any) {
            this.status.error = true
            this.status.loading = false
            if (!error.response) {
                this.status.message = 'حدث خطأ في الشبكة'
                return
            }
            if (error.response.status === 401 || error.response.status === 422) {
                this.status.message = 'البريد الالكتروني او كلمة المرور غير صحيحة'
                return
            }
            if (error.response.status === 403) {
                this.status.message = 'ليس لديك صلاحية للقيام بهذه العملية'
                return
            }
            if (error.response.status === 404) {
                this.status.message = 'المورد غير موجود'
                return
            }
            if (error.response.status === 500) {
                this.status.message = 'حدث خطأ في الخادم'
                return
            }
            this.status.message = 'حدث خطأ'
        }
    }   
})