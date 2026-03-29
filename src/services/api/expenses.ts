import type { Expense } from "@/Types";
import axios from "./axios";

function appendExpenseFilters(
  params: URLSearchParams,
  search: string,
  from: string,
  to: string
): void {
  if (search) params.set("search", search);
  if (from) params.set("from", from);
  if (to) params.set("to", to);
}

function buildExpenseQuery(page: number, search: string, from: string, to: string): string {
  const params = new URLSearchParams();
  params.set("page", String(page));
  appendExpenseFilters(params, search, from, to);
  return params.toString();
}

function buildExpensePrintQuery(search: string, from: string, to: string): string {
  const params = new URLSearchParams();
  appendExpenseFilters(params, search, from, to);
  return params.toString();
}

export const expenses = {
  getExpenses: (page: number, search = "", from = "", to = "") => {
    return axios.get("/auth/expenses?" + buildExpenseQuery(page, search, from, to));
  },
  getExpense: (id: number) => {
    return axios.get(`/auth/expenses/${id}`);
  },
  createExpense: (data: Expense) => {
    return axios.post("/auth/expenses", data);
  },
  updateExpense: (data: Expense) => {
    return axios.put(`/auth/expenses/${data.id}`, data);
  },
  printExpenses: (search = "", from = "", to = "") => {
    const q = buildExpensePrintQuery(search, from, to);
    const suffix = q ? "?" + q : "";
    return axios.get("/auth/expenses/print" + suffix, { responseType: "blob" });
  },
};