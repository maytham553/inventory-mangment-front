export interface Product {
    id?: number;
    name: string;
    code: string;
    barcode?: string;
    quantity?: number;
    price: number;
    cost: number;
    note?: string;
    created_at?: string;
    updated_at?: string;
}