export interface Supplier {
    id?: number;
    name: string;
    email?: string;
    phone: string;
    governorate_id: number;
    address: string;
    balance?: number;
    note?: string;
    created_at?: string;
    updated_at?: string;
}