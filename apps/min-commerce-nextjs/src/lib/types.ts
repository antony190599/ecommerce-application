
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

export interface ProductProps {
    id: string;
    name: string;
    slug: string;
    unit: string;
    meta: string;
    price: string;
    discountPrice?: string;
    imageUrl: string;
    isOnSale?: boolean;
    stock: number;
    rating?: string;
    createdAt: string;
    updatedAt: string;
    category?: string; // Optional, if you want to include category in the table
}
