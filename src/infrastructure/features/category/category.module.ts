import { Module } from "@nestjs/common";
import { CategoryController } from "./category.controller";
import { CategoryRepositoryImplementation } from "src/infrastructure/database/repositories/category.repository.impl";
import { GetCategoriesUseCase } from "src/core/domain/use-cases/category/get-categories-use-case";
import { CreateCategoryUseCase } from "src/core/domain/use-cases/category/create-category-use-case";
import { UpdateCategoryUseCase } from "src/core/domain/use-cases/category/update-category-use-case";
import { DeleteCategoryUseCase } from "src/core/domain/use-cases/category/delete-category-use-case";

@Module({
    controllers: [ CategoryController ],
    providers: [
        GetCategoriesUseCase,
        CreateCategoryUseCase,
        UpdateCategoryUseCase,
        DeleteCategoryUseCase,
        {
            provide: 'CategoryRepository',
            useClass: CategoryRepositoryImplementation,
        }
    ],
    exports: [ 'CategoryRepository' ],
})

export class CategoryModule {}