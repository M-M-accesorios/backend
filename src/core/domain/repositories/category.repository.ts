import { CreateCategoryDto } from "src/application/dtos/category/create-category.dto";
import { UpdateCategoryDto } from "src/application/dtos/category/update-category.dto";
import { CategoryDocument } from "src/infrastructure/types/category";

export interface categoryRepository {
    getAllCategories(): Promise<CategoryDocument[]>;
    createCategory(body: CreateCategoryDto): Promise<CategoryDocument>;
    updateCategory(id: string, body: UpdateCategoryDto): Promise<CategoryDocument>;
    deleteCategory(id: string): Promise<CategoryDocument>;
}