import { defineStore } from 'pinia'
import { backup } from '@/services/api'
import type { Backup, Status } from '@/Types'

export const useBackupStore = defineStore('backup', {
    state: () => ({
        backups: [] as Backup[],
        keepLimit: 0,
        backupsStatus: {} as Status,
        backupStatus: {} as Status,
    }),
    getters: {
        getBackups: (state) => state.backups,
    },
    actions: {
        async fetchBackups() {
            this.clearBackupsStatus()
            try {
                this.backupsStatus.loading = true
                const { data: response } = await backup.getBackups()
                this.backups = response.data.backups
                this.keepLimit = response.data.keep_limit
                this.backupsStatus.success = true
            } catch (error) {
                await this.handleError(this.backupsStatus, error)
                throw error
            } finally {
                this.backupsStatus.loading = false
            }
        },
        async createBackup() {
            this.clearBackupStatus()
            try {
                this.backupStatus.loading = true
                await backup.createBackup()
                // The server drops the oldest archives past the limit, so read
                // the list back instead of guessing what survived.
                await this.fetchBackups()
                this.backupStatus.success = true
            } catch (error) {
                await this.handleError(this.backupStatus, error)
                throw error
            } finally {
                this.backupStatus.loading = false
            }
        },
        async downloadBackup(name: string) {
            this.clearBackupStatus()
            try {
                this.backupStatus.loading = true
                const response = await backup.downloadBackup(name)
                this.saveBlob(response.data, name)
                this.backupStatus.success = true
            } catch (error) {
                await this.handleError(this.backupStatus, error)
                throw error
            } finally {
                this.backupStatus.loading = false
            }
        },
        async deleteBackup(name: string) {
            this.clearBackupStatus()
            try {
                this.backupStatus.loading = true
                await backup.deleteBackup(name)
                this.backups = this.backups.filter((item) => item.name !== name)
                this.backupStatus.success = true
            } catch (error) {
                await this.handleError(this.backupStatus, error)
                throw error
            } finally {
                this.backupStatus.loading = false
            }
        },
        saveBlob(data: Blob, fileName: string) {
            const url = window.URL.createObjectURL(new Blob([data], { type: 'application/gzip' }))
            const link = document.createElement('a')
            link.href = url
            link.download = fileName
            document.body.appendChild(link)
            link.click()
            link.remove()
            // Firefox and Safari read the blob after the click returns, so
            // revoking straight away can cancel the download.
            setTimeout(() => window.URL.revokeObjectURL(url), 10000)
        },
        clearBackupsStatus() {
            this.backupsStatus = { loading: false, success: false, error: false, message: '' } as Status
        },
        clearBackupStatus() {
            this.backupStatus = { loading: false, success: false, error: false, message: '' } as Status
        },
        async handleError(status: Status, error: any) {
            status.error = true
            if (!error.response) {
                status.message = 'حدث خطأ في الشبكة'
                return
            }
            if (error.response.status === 403) {
                status.message = 'ليس لديك صلاحية للقيام بهذه العملية'
                return
            }
            if (error.response.status === 404) {
                status.message = 'الملف غير موجود'
                return
            }
            if (error.response.status === 409) {
                status.message = 'هناك عملية نسخ جارية، حاول بعد لحظات'
                return
            }
            if (error.response.status === 429) {
                status.message = 'عدد كبير من الطلبات، انتظر دقيقة ثم أعد المحاولة'
                return
            }
            // A download asks for a blob, so its error body arrives as a Blob too.
            status.message = (await this.messageFromBlob(error.response.data))
                || error.response.data?.message
                || 'تعذر تنفيذ العملية'
        },
        async messageFromBlob(data: any): Promise<string> {
            try {
                const text = data instanceof Blob ? await data.text() : ''

                return text ? JSON.parse(text).message ?? '' : ''
            } catch {
                return ''
            }
        },
    },
})
