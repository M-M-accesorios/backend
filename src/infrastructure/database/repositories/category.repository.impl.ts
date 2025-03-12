import { HttpException, HttpStatus, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { categoryRepository } from "src/core/domain/repositories/category.repository";
import { CategoryDocument } from "src/infrastructure/types/category";
import { CategoryModel } from "../models/category.model";
import { CreateCategoryDto } from "src/application/dtos/category/create-category.dto";
import { UpdateCategoryDto } from "src/application/dtos/category/update-category.dto";

export class CategoryRepositoryImplementation implements categoryRepository {
    constructor(){};

    async getAllCategories(): Promise<CategoryDocument[]> {
        try {
            return await CategoryModel.find().select('-__v');
        } catch (error) {
            const message = error instanceof Error ? error.message : 'An unexpected error occurred while getting categories';
            console.error(`[${CategoryRepositoryImplementation.name}]${message}`);
            throw new InternalServerErrorException(message);
        };
    };

    async createCategory(body: CreateCategoryDto): Promise<CategoryDocument> {
        try {
            const newCategory = new CategoryModel(body);
            return await newCategory.save();
        } catch (error) {
            const message = error instanceof Error ? error.message : 'An unexpected error occurred while creating new category';
            console.error(`[${CategoryRepositoryImplementation.name}]${message}`);
            throw new InternalServerErrorException(message);
        }
    }

    async updateCategory(id: string, body: UpdateCategoryDto): Promise<CategoryDocument> {
        try {
            const updatedCategory = await CategoryModel.findByIdAndUpdate(id, body, {new: true});
            if(!updatedCategory) {
                throw new NotFoundException('Product not found');
            };
            return updatedCategory;
        } catch (error) {
            const message =  error instanceof Error ? error.message : 'An error occurred while updating category';
            console.error(`[${CategoryRepositoryImplementation.name}]${message}`);
            throw new HttpException(
                message,
                error instanceof HttpException ? error.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async deleteCategory(id: string): Promise<CategoryDocument> {
        try {
            const updatedCategory = await CategoryModel.findByIdAndDelete(id);
            if(!updatedCategory) {
                throw new NotFoundException('Product not found');
            };
            return updatedCategory;
        } catch (error) {
            const message =  error instanceof Error ? error.message : 'An error occurred while deleting category';
            console.error(`[${CategoryRepositoryImplementation.name}]${message}`);
            throw new HttpException(
                message,
                error instanceof HttpException ? error.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }
};