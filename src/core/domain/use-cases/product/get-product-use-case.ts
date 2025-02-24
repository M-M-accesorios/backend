import { Inject, Injectable } from "@nestjs/common";
import { ProductRepository } from "../../repositories/product.repository";
import { ProductDocument } from "src/infrastructure/types/products";

@Injectable()
export class GetProductByIdUseCase {
    constructor(@Inject('ProductRepository') public readonly productRepository: ProductRepository ) {}

    async execute(id: string): Promise<ProductDocument> {
        try {
            return this.productRepository.getProductById(id);
        } catch (error) {
            console.error(`[${this.constructor.name}] Error while getting product:`, error);
            throw error;
        };
    };
};