export interface User {
    id: string;
    created_at: string;
    updated_at: string;
    email: string;
    password_hash: string;
    user_status: number;
    user_role: string;
}

export interface UsersResponse {
    error: boolean;
    limit: number;
    message: string | null;
    page: number;
    total: number;
    totalPages: number;
    users: User[];
}