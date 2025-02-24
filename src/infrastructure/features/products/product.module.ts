import { Module } from "@nestjs/common";
import { ProductController } from "./product.controller";
import { GetAllProductsUseCase } from "src/core/domain/use-cases/product/get-products-use-case";
import { ProductRepositoryImplementation } from "src/infrastructure/database/repositories/product.repository.impl";
import { CreateProductUseCase } from "src/core/domain/use-cases/product/create-product-use-case";
import { GetProductByIdUseCase } from "src/core/domain/use-cases/product/get-product-use-case";
import { UpdateProductUseCase } from "src/core/domain/use-cases/product/update-product-use-case";
import { DeleteProductByIdUseCase } from "src/core/domain/use-cases/product/delete-product-use-case";

@Module({
    controllers:[ProductController],
    providers: [
        GetAllProductsUseCase,
        CreateProductUseCase,
        GetProductByIdUseCase,
        UpdateProductUseCase,
        DeleteProductByIdUseCase,
        {
            provide: 'ProductRepository',
            useClass: ProductRepositoryImplementation,
        }
    ],
    exports: [],
})

export class ProductModule {};