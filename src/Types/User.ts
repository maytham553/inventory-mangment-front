export interface User {
    id: number;
    name: string;
    email: string;
    type: UserType;
    created_at: string;
    updated_at: string;
}
export type UserType = 'Admin' | 'User' | 'SuperAdmin' ; 