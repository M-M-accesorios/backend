import { Inject, Injectable } from "@nestjs/common";
import { categoryRepository } from "../../repositories/category.repository";
import { CategoryDocument } from "src/infrastructure/types/category";

@Injectable()
export class GetCategoriesUseCase {
    constructor(@Inject('CategoryRepository') private readonly categoryRepository: categoryRepository){}

    public async execute(): Promise<CategoryDocument[]> {
        try {
            return await this.categoryRepository.getAllCategories();
        } catch (error: unknown) {
            console.error(`[${this.constructor.name}] Error while getting user:`, error);
            throw error;
        };
    }
}