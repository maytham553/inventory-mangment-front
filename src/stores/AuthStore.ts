import { defineStore } from 'pinia'
import type { User, Status } from '@/Types'
import { auth } from '@/services/api'
import router from '@/router'
export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null as User | null,
        token: localStorage.getItem('token') || '',
        status: {
            loading: false,
            error: false,
            success: false,
            message: '',
        } as Status,
    }),
    getters: {
        isLoggedIn: (state) => !!state.token,
        getUserType: (state) => state.user?.type,
        isUser: (state) => state.user?.type === 'User',
        isAdmin: (state) => state.user?.type === 'Admin',
    },
    actions: {
        async login(email: string, password: string) {
            try {
                this.status.loading = true
                const response = await auth.login({ email, password })
                this.token = response.data.data.token
                this.user = response.data.user
                localStorage.setItem('token', this.token)
                this.status.success = true
                this.status.loading = false
                this.status.error = false
                window.location.reload()
            } catch (error: any) {
                this.handleError(error)
                throw error
            }
        },
        async logout() {
            try {
                this.status.loading = true
                const response = await auth.logout()
                this.clearAuthToken()
                this.status.success = true
                this.status.loading = false
                this.status.error = false
                router.push({ name: 'Login' })
            } catch (error: any) {
                this.handleError(error)
                throw error
            }
        },
        async fetchCurrentUser() {
            try {
                this.status.loading = true
                const response = await auth.currentUser()
                this.user = response.data.data
                this.status.success = true
                this.status.loading = false
                this.status.error = false
            } catch (error: any) {
                this.handleError(error)
                throw error
            }
        },
        handleError(error: any) {
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
            if (error.response.status === 500) {
                this.status.message = 'حدث خطأ في الخادم'
                return
            }
            this.status.message = 'حدث خطأ ما'
        },
        clearAuthToken() {
            this.token = ''
            this.user = null
            localStorage.removeItem('token')
        },
    },
})

