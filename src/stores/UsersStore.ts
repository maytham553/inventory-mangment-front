import { defineStore } from 'pinia'
import { users } from '@/services/api'
import type { User, Status, Pagination } from '@/Types'

export const useUsersStore = defineStore('users', {
    state: () => ({
        users: [] as User[],
        user: {} as User,
        userStatus: {} as Status,
        usersStatus: {} as Status,
        userListSearch: '',
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
        getUsers: (state) => state.users,
        getUser: (state) => state.user,
        getUserStatus: (state) => state.userStatus,
        getUsersStatus: (state) => state.usersStatus,
    },
    actions: {
        async fetchUsers(page = 1, search?: string) {
            if (search !== undefined) {
                this.userListSearch = search
            }
            this.clearUsersStatus();
            try {
                this.usersStatus.loading = true
                const { data: response } = await users.getUsers(page, this.userListSearch)
                this.users = response.data.data
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
                this.usersStatus.success = true
            } catch (error) {
                this.handleUsersError(error)
                throw error
            } finally {
                this.usersStatus.loading = false
            }
        },
        async fetchUser(id: number) {
            this.clearUserStatus();
            try {
                this.userStatus.loading = true
                const { data: response } = await users.getUser(id)
                this.user = response.data
                this.userStatus.success = true
            } catch (error) {
                this.handleUserError(error)
                throw error
            } finally {
                this.userStatus.loading = false
            }
        },
        async createUser(user: User) {
            this.clearUserStatus();
            try {
                this.userStatus.loading = true
                const { data: response } = await users.createUser(user)
                this.users.unshift(response.data)
                this.user = response.data
                this.userStatus.success = true
            } catch (error) {
                this.handleUserError(error)
                throw error
            } finally {
                this.userStatus.loading = false
            }
        },
        async updateUser(id: number, user: Partial<User>) {
            this.clearUserStatus();
            try {
                this.userStatus.loading = true
                const payload = { ...user }
                // an empty password field means "keep the current password"
                if (!payload.password) {
                    delete payload.password
                }
                const { data: response } = await users.updateUser(id, payload)
                this.user = response.data
                this.users = this.users.map((item) => {
                    if (item.id === id) {
                        return this.user
                    }
                    return item
                })
                this.userStatus.success = true
            } catch (error) {
                this.handleUserError(error)
                throw error
            } finally {
                this.userStatus.loading = false
            }
        },
        async deleteUser(id: number) {
            this.clearUserStatus();
            try {
                this.userStatus.loading = true
                await users.deleteUser(id)
                this.users = this.users.filter((user) => user.id !== id)
                this.userStatus.success = true
            } catch (error: any) {
                this.handleUserError(error)
                if (error.response?.status === 403) {
                    this.userStatus.message = 'لا يمكنك حذف حسابك الخاص'
                }
                throw error
            } finally {
                this.userStatus.loading = false
            }
        },
        clearUsersStatus() {
            this.usersStatus = {
                loading: false,
                success: false,
                error: false,
                message: '',
            } as Status;
        },
        clearUserStatus() {
            this.userStatus = {
                loading: false,
                success: false,
                error: false,
                message: '',
            } as Status;
        },
        setUser(user: User) {
            this.user = user;
        },
        handleUsersError(error: any) {
            this.usersStatus.error = true;
            if (!error.response) {
                this.usersStatus.message = 'حدث خطأ في الشبكة'
                return
            } else if (error.response.status === 403) {
                this.usersStatus.message = 'ليس لديك صلاحية للقيام بهذه العملية'
                return
            } else if (error.response.status === 500) {
                this.usersStatus.message = 'حدث خطأ في الخادم'
                return
            }
            this.usersStatus.message = 'حدث خطأ ما'
        },
        handleUserError(error: any) {
            this.userStatus.error = true;
            const errors = error.response?.data?.errors
            if (!error.response) {
                this.userStatus.message = 'حدث خطأ في الشبكة'
            } else if (error.response.status === 403) {
                this.userStatus.message = 'ليس لديك صلاحية للقيام بهذه العملية'
            } else if (error.response.status === 500) {
                this.userStatus.message = 'حدث خطأ في الخادم'
            } else if (errors?.email) {
                this.userStatus.message = 'البريد الالكتروني مستخدم من قبل او غير صحيح'
            } else if (errors?.password) {
                this.userStatus.message = 'كلمة المرور يجب ان تكون 8 احرف على الاقل'
            } else if (errors?.name) {
                this.userStatus.message = 'الاسم مطلوب'
            } else if (errors?.type) {
                this.userStatus.message = 'الصلاحية غير صحيحة'
            } else {
                this.userStatus.message = 'حدث خطأ ما'
            }
        },
    }
})
