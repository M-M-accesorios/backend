import { Document } from "mongoose";
import { CategoryDocument } from "../category";

export interface Product {
    name: string;
    price: number;
    description: string;
    ref: string;
    image:string;
    categories: CategoryDocument[]
}

export interface ProductFilter {
    categories?: string;
}
export interface ProductDocument extends Product, Document {}