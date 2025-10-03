export type SignUpResponse = {
    message: string;
    userId: string;
}

export enum UserRole {
    Admin = "admin",
    User = "user",
    Agent = "agent"
}
