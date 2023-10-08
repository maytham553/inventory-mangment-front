export enum TransactionType {
    CREDIT = "credit",
    DEBIT = "debit"
}

export interface Transaction {
    id?: number;
    user_id?: number;
    type: TransactionType;
    amount: number;
    note?: string;
    created_at?: string;
    updated_at?: string;
}

export interface CustomerTransaction extends Transaction {
    customer_id: number;
}

export interface SupplierTransaction extends Transaction {
    supplier_id: number;
}

