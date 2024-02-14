import axios from './axios';

export const dashboard = {

    getSalesStatistics: async (from="" , to="") => {
        return await axios.get(`/auth/reports/sales-statistics?from=${from}&to=${to}`);
    },
    getSalesStatisticsByDay: async (date:string) => {
        return await axios.get(`/auth/reports/sales-statistics-by-day?date=${date}`);
    }
};


