import type { Expense } from "@/Types";
import axios from "./axios";

export const expenses = {
  getExpenses: (page: number , search="" , from="" , to="") => {
    return axios.get("/auth/expenses?page=" + page + "&search=" + search + "&from=" + from + "&to=" + to);
  },
  getExpense: (id: number) => {
    return axios.get(`/auth/expenses/${id}`);
  },
  createExpense: (data: Expense) => {
    return axios.post("/auth/expenses", data);
  },
  printExpenses: (search="" , from="" , to="") => {
    return axios.get("/auth/expenses/print?search=" + search + "&from=" + from + "&to=" + to , 
    { responseType: 'blob' });
  },
};