import { Inject, Injectable } from "@nestjs/common";
import { ProductRepository } from "../../repositories/product.repository";
import { ProductDocument } from "src/infrastructure/types/products";

@Injectable()
export class DeleteProductByIdUseCase {
    constructor(@Inject('ProductRepository') public readonly productRepository: ProductRepository) {};

    async execute(id: string): Promise<ProductDocument> {
        try {
            return this.productRepository.deleteProductById(id);
        } catch (error) {
            console.log(`[${this.constructor.name}] an error occures while deleting product`, error);
            throw error;
        };
    };
};