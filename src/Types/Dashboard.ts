import type { TransactionType } from ".";

interface DashboardProduct {
    name: string;
    quantity: number;
    total: number;
    cost: number;
    price: number;
}

export interface DashboardSale {
    profit: number;
    customer_name: string;
    user_name: string;
    products: DashboardProduct[];
}

export interface DashboardTransaction {
    amount: number;
    customer_name: string;
    user_name: string;
    type: TransactionType
}

export interface DashboardStatistics {
    sales_count: number;
    total_profit: number;
    total_sales: number;
}

