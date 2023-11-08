
export interface Expense {
    id?: number;
    title: string;
    amount: number;
    description?: string;
    user_id?: number;
    created_at?: string;
    updated_at?: string;
}