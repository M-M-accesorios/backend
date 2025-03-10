import { Injectable, Inject  } from "@nestjs/common";
import { categoryRepository } from "../../repositories/category.repository";
import { CreateCategoryDto } from "src/application/dtos/category/create-category.dto";
import { CategoryDocument } from "src/infrastructure/types/category";

@Injectable()
export class CreateCategoryUseCase {

    constructor(@Inject('CategoryRepository') public readonly categoryRepository: categoryRepository) {}

    async execute(body: CreateCategoryDto): Promise<CategoryDocument> {
        try {
            return this.categoryRepository.createCategory(body);
        } catch (error) {
            console.error(`[${this.constructor.name}] Error while creating category:`, error);
            throw error;
        }
    }
}