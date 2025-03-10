import { Controller, Post, Body, Get, Put, Delete, Param} from '@nestjs/common';
import { CreateCategoryDto } from 'src/application/dtos/category/create-category.dto';
import { UpdateCategoryDto } from 'src/application/dtos/category/update-category.dto';
import { CreateCategoryUseCase } from 'src/core/domain/use-cases/category/create-category-use-case';
import { DeleteCategoryUseCase } from 'src/core/domain/use-cases/category/delete-category-use-case';
import { GetCategoriesUseCase } from 'src/core/domain/use-cases/category/get-categories-use-case';
import { UpdateCategoryUseCase } from 'src/core/domain/use-cases/category/update-category-use-case';


@Controller('categories')
export class CategoryController {
  
  constructor(
    private readonly getCategoriesUseCase: GetCategoriesUseCase,
    private readonly createCategoryUseCase: CreateCategoryUseCase,
    private readonly updateCategoryUseCase: UpdateCategoryUseCase,
    private readonly deleteCategoryUseCase: DeleteCategoryUseCase,
  ) {}

  @Get("/")
  async getCategories() {
    return this.getCategoriesUseCase.execute();
  }

  @Post('/')
  async createCategory(@Body() body: CreateCategoryDto) {
    return this.createCategoryUseCase.execute(body);
  }

  @Put('/:id')
  async updateCategoryById(@Body() body: UpdateCategoryDto, @Param('id') id: string) {
    return this.updateCategoryUseCase.execute(id, body);
  }

  @Delete("/:id")
  async deleteCategoryById(@Param('id') id: string) {
    return this.deleteCategoryUseCase.execute(id);
  }
}