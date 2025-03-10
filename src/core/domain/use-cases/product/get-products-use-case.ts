import { Inject, Injectable } from "@nestjs/common";
import { ProductRepository } from "../../repositories/product.repository";
import { ProductDocument } from "src/infrastructure/types/products";

@Injectable()
export class GetAllProductsUseCase {
    constructor(@Inject('ProductRepository') private readonly productRepository: ProductRepository) {};

    async execute(category?: string): Promise<ProductDocument[]> {
        try {
            return await this.productRepository.getAllProducts(category);
        } catch (error) {
            console.error(`[${this.constructor.name}] Error while getting products:`, error);
            throw error;
        };
    };
};