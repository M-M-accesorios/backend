import { Inject, Injectable } from "@nestjs/common";
import { ProductRepository } from "../../repositories/product.repository";
import { CreateProductDto } from "src/application/dtos/product/create-product.dto";
import { ProductDocument } from "src/infrastructure/types/products";

@Injectable()
export class CreateProductUseCase {
    constructor(@Inject('ProductRepository') public readonly productRepository: ProductRepository ) {};

    async execute(product: CreateProductDto): Promise<ProductDocument> {
        try {
            return this.productRepository.createProduct(product);
        } catch (error) {
            console.error(`[${this.constructor.name}] Error while getting products:`, error);
            throw error;
        };
    };
};