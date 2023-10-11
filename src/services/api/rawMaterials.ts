import type { RawMaterial } from '@/Types';
import axios from './axios';

export const rawMaterials = {
    
    getRawMaterials: (page: number) => {
        return axios.get('/auth/raw-materials?page=' + page);
    },
    getRawMaterial: (id: number) => {
        return axios.get(`/auth/raw-materials/${id}`);
    },
    createRawMaterial: (data: RawMaterial) => {
        return axios.post('/auth/raw-materials', data);
    },
    updateRawMaterial: (id: number, data: RawMaterial) => {
        console.log(data);
        return axios.put(`/auth/raw-materials/${id}`, data);
    },
    deleteRawMaterial: (id: number) => {
        return axios.delete(`/auth/raw-materials/${id}`);
    },
};