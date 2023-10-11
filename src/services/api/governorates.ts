import axios from './axios';


export const governorates ={
    
    getGovernorates: () => {
        return axios.get('/auth/governorates');
    },
}