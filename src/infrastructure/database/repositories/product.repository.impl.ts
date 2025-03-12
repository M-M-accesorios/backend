import { HttpException, HttpStatus, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { ProductRepository } from "src/core/domain/repositories/product.repository";
import { ProductDocument, ProductFilter } from "src/infrastructure/types/products";
import { ProductModel } from "../models/product.model";
import { CreateProductDto } from "src/application/dtos/product/create-product.dto";
import { UpdateProductDto } from "src/application/dtos/product/update-product.dto";

export class ProductRepositoryImplementation implements ProductRepository {
    constructor(){};

    async getAllProducts(category?: string): Promise<ProductDocument[]> {
        try {
            const filter:ProductFilter = {}
            if(category){
                filter.categories = category
            }
            return await ProductModel.find(filter);
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

    async updateProductById(id: string ,body: UpdateProductDto) {
        try {
            const {categories, ...updateFields } = body;
            const updateQuery = {$set: updateFields, $addToSet: null };
            
            if (categories && categories.length > 0) {
                updateQuery.$addToSet = { categories: { $each: categories } };
            } else {
                delete updateQuery.$addToSet;
            }
            const newProduct = await ProductModel.findByIdAndUpdate(id, updateQuery, {new: true});
            
            if(!newProduct) {
                throw new NotFoundException('Product not found');
            };
            return newProduct;
        } catch (error) {
            const message = error instanceof Error ? error.message : 'An error occurred while updating product';
            console.log(`[${ProductRepositoryImplementation.name}]${message}`);
            throw new HttpException(
                message,
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