import axios from './axios';

export const backup = {
    getBackups: () => {
        return axios.get('/auth/database/backups');
    },
    createBackup: () => {
        return axios.post('/auth/database/backups');
    },
    downloadBackup: (name: string) => {
        return axios.get(`/auth/database/backups/${encodeURIComponent(name)}/download`, {
            responseType: 'blob',
        });
    },
    deleteBackup: (name: string) => {
        return axios.delete(`/auth/database/backups/${encodeURIComponent(name)}`);
    },
};
