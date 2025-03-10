import { Inject, Injectable } from "@nestjs/common";
import { categoryRepository } from "../../repositories/category.repository";
import { CategoryDocument } from "src/infrastructure/types/category";

@Injectable()
export class DeleteCategoryUseCase {
    constructor(@Inject('CategoryRepository') public readonly categoryRepository: categoryRepository ) {}

    async execute(id: string): Promise<CategoryDocument> {
        try {
            return await this.categoryRepository.deleteCategory(id);
        } catch (error) {
            console.error(`[${this.constructor.name}] An error occures while deleting category`, error);
            throw error;
        }
    }
}