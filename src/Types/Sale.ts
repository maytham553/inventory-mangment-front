import type { Product } from ".";

export enum SaleStatus {
    Pending = 'pending',
    Confirmed = 'confirmed',
    Cancelled = 'cancelled',
}

export interface SaleProduct extends Product {
    product_id?: number;
    sale_id: number;
    subtotal: number;
    total: number;
    unit_price: number;
    discount_amount: number;
    discount_percentage: number;
}

export interface Sale {
    id: number;
    user_id: number;
    customer_id: number;
    total_amount: number;
    subtotal_amount: number;
    discount_amount: number;
    discount_percentage: number;
    status: SaleStatus;
    note: string;
    products: SaleProduct[];
    previous_balance?: number;
    driver_name?: string;
    created_at: string;
    updated_at: string;
}