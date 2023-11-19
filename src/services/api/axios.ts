import { useAuthStore } from '@/stores';
import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://api.safa-sponge.com/api',
});

instance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);
instance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        const authStore = useAuthStore();
        if (error.response && error.response.status === 401) {
            authStore.clearAuthToken()
            window.location.reload();
        }
        return Promise.reject(error);
    }
);

export default instance;
