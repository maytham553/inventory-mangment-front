import type { Expense } from "@/Types";
import axios from "./axios";

export const expenses = {
  getExpenses: (page: number , search="") => {
    return axios.get("/auth/expenses?page=" + page + "&search=" + search);
  },
  getExpense: (id: number) => {
    return axios.get(`/auth/expenses/${id}`);
  },
  createExpense: (data: Expense) => {
    return axios.post("/auth/expenses", data);
  },
};