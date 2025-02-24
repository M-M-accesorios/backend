import { HttpException, HttpStatus, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { ProductRepository } from "src/core/domain/repositories/product.repository";
import { ProductDocument } from "src/infrastructure/types/products";
import { ProductModel } from "../models/product.model";
import { CreateProductDto } from "src/application/dtos/product/create-product.dto";
import { UpdateProductDto } from "src/application/dtos/product/update-product.dto";

export class ProductRepositoryImplementation implements ProductRepository {
    constructor(){};

    async getAllProducts(): Promise<ProductDocument[]> {
        try {
            return await ProductModel.find();
        } catch (error) {
            const message = error instanceof Error ? error.message : 'An unexpected error occurred while getting products';
            console.error(`[${ProductRepositoryImplementation.name}]${message}`);
            throw new InternalServerErrorException(message);
        };
    };

    async createProduct(product: CreateProductDto): Promise<ProductDocument> {
        try {
            const newProduct = new ProductModel(product);
            return await newProduct.save();
        } catch(error) {
            const message = error instanceof Error ? error.message : "An error occures while creating product";
            console.error(`[${ProductRepositoryImplementation.name}]${message}`);
            throw new InternalServerErrorException(message);
        };
    };

    async getProductById(id: string): Promise<ProductDocument> {
        try {
            const product = await ProductModel.findById(id);
            if(!product) {
                throw new NotFoundException('Product not found');
            };
            return product;
        } catch (error) {
            throw new HttpException(
                error instanceof Error ? error.message : 'An error occurred while getting product',
                error instanceof HttpException ? error.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR,
            );
        };
    };

    async updateProductById(id: string ,body: UpdateProductDto): Promise<ProductDocument> {
        try {
            const newProduct = await ProductModel.findByIdAndUpdate(id, body, {new: true});
            if(!newProduct) {
                throw new NotFoundException('Product not found');
            };
            return newProduct;
        } catch (error) {
            throw new HttpException(
                error instanceof Error ? error.message : 'An error occurred while updating product',
                error instanceof HttpException ? error.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR,
            );
        };
    };

    async deleteProductById(id: string): Promise<ProductDocument> {
        try {
            const productDeleted = await ProductModel.findByIdAndDelete(id);
            if(!productDeleted) {
                throw new NotFoundException('Product not found');
            };
            return productDeleted;
        } catch (error) {
            throw new HttpException(
                error instanceof Error ? error.message : 'An error occurred while deleting product',
                error instanceof HttpException ? error.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR,
            );
        };
    };
};