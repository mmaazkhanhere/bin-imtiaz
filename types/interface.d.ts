export interface Inventory{
    id: string;
    productName: string;
    category: string;
    totalStock: number;
    stock: number;
    price: number;
    color: string
}

export interface Sales{
    id: string;
    productName: string;
    price: number;
    quantity: number;
    seller: string;
    category: string;
    color: string;
    date: string;
}