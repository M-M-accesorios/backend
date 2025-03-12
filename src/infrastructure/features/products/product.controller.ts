import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { CreateProductDto } from "src/application/dtos/product/create-product.dto";
import { UpdateProductDto } from "src/application/dtos/product/update-product.dto";
import { CreateProductUseCase } from "src/core/domain/use-cases/product/create-product-use-case";
import { DeleteProductByIdUseCase } from "src/core/domain/use-cases/product/delete-product-use-case";
import { GetProductByIdUseCase } from "src/core/domain/use-cases/product/get-product-use-case";
import { GetAllProductsUseCase } from "src/core/domain/use-cases/product/get-products-use-case";
import { UpdateProductUseCase } from "src/core/domain/use-cases/product/update-product-use-case";

@Controller('products')
export class ProductController {
    constructor(
        private readonly getAllProductsUseCase: GetAllProductsUseCase,
        private readonly createProductUseCase: CreateProductUseCase,
        private readonly getProductByIdUseCase: GetProductByIdUseCase,
        private readonly updateProductByIdUseCase: UpdateProductUseCase,
        private readonly deleteProductByIdUseCase: DeleteProductByIdUseCase,
    ) {};

    @Get()
    async getAllProducts(@Query('category') category?: string) {
        console.log(category)
        return this.getAllProductsUseCase.execute(category);
    }

    @Get('/:id')
    async getProductById(@Param('id') id: string){
        return this.getProductByIdUseCase.execute(id);
    }

    @Post()
    async createProduct(@Body() body: CreateProductDto) {
        return this.createProductUseCase.execute(body);
    }

    @Put('/:id')
    async updateProduct(
        @Body() body: UpdateProductDto,
        @Param('id') id: string,
    ){
        return this.updateProductByIdUseCase.execute(id, body);
    }

    @Delete('/:id')
    async deleteProduct(@Param('id') id: string){
        return this.deleteProductByIdUseCase.execute(id)
    }


}