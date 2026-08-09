import type { RawMaterial, User } from ".";

export enum PurchaseStatus {
    Pending = 'pending',
    Confirmed = 'confirmed',
    Cancelled = 'cancelled',
}

export interface PurchaseRawMaterial extends RawMaterial {
    raw_material_id?: number;
    purchase_id: number;
    subtotal: number;
    total: number;
    unit_price: number;
    discount_amount: number;
    discount_percentage: number;
}

export interface Purchase {
    id: number;
    user_id: number;
    user?: User;
    supplier_id: number;
    total_amount: number;
    subtotal_amount: number;
    discount_amount: number;
    discount_percentage: number;
    status: PurchaseStatus;
    note: string;
    raw_materials: PurchaseRawMaterial[];
    created_at: string;
    updated_at: string;
}