import { Injectable, Inject } from "@nestjs/common";
import { categoryRepository } from "../../repositories/category.repository";
import { CategoryDocument } from "src/infrastructure/types/category";
import { UpdateCategoryDto } from "src/application/dtos/category/update-category.dto";

@Injectable()
export class UpdateCategoryUseCase {
    constructor(@Inject('CategoryRepository') public readonly categoryRepository: categoryRepository) {}

    async execute(id: string, body: UpdateCategoryDto): Promise<CategoryDocument> {
        try {
            return await this.categoryRepository.updateCategory(id, body);
        } catch (error) {
            console.log(`[${this.constructor.name}] An error occures while updating category`, error);
            throw Error;
        }
    }
} 