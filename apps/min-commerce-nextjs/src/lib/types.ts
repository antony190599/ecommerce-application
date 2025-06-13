

export interface UserProps {
    id: string;
    name: string;
    email: string;
    isAdmin: boolean;
    image?: string;
    createdAt: Date;
    hasPassword: boolean;
    provider: string | null;
}

