import { Inject, Injectable } from "@nestjs/common";
import { ProductRepository } from "../../repositories/product.repository";
import { ProductDocument } from "src/infrastructure/types/products";

@Injectable()
export class GetAllProductsUseCase {
    constructor(@Inject('ProductRepository') private readonly productRepository: ProductRepository) {};

    async execute(): Promise<ProductDocument[]> {
        try {
            return await this.productRepository.getAllProducts();
        } catch (error) {
            console.error(`[${this.constructor.name}] Error while getting products:`, error);
            throw error;
        };
    };
};