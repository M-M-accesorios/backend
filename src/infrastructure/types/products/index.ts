import { Document } from "mongoose";

export interface Product {
    name: string;
    price: number;
    description: string;
    ref: string;
    image:string;
}

export interface ProductDocument extends Product, Document {}