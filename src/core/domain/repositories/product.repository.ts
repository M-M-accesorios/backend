import { CreateProductDto } from "src/application/dtos/product/create-product.dto";
import { UpdateProductDto } from "src/application/dtos/product/update-product.dto";
import { ProductDocument } from "src/infrastructure/types/products";

export interface ProductRepository {
    getAllProducts(): Promise<ProductDocument[]>;
    createProduct(product: CreateProductDto): Promise<ProductDocument>;
    getProductById(id: string): Promise<ProductDocument>;
    updateProductById(id: string, body: UpdateProductDto): Promise<ProductDocument>;
    deleteProductById(id: string): Promise<ProductDocument>;
};