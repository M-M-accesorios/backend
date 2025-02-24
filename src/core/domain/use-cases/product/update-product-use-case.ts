import { Inject, Injectable } from "@nestjs/common";
import { ProductRepository } from "../../repositories/product.repository";
import { UpdateProductDto } from "src/application/dtos/product/update-product.dto";
import { ProductDocument } from "src/infrastructure/types/products";

@Injectable()
export class UpdateProductUseCase {
    constructor(@Inject('ProductRepository') public readonly productRepository: ProductRepository) {};

    async execute(id: string,body: UpdateProductDto): Promise<ProductDocument> {
        try {
            return await this.productRepository.updateProductById(id, body);
        } catch (error) {
            console.error(`[${this.constructor.name}] Error while updating product`, error);
            throw Error;
        };
    };
};