import { InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { CategoryModel } from "../../database/models/category.model";
import { CategoryRepositoryImplementation } from "../../database/repositories/category.repository.impl";

describe('CategoryRepository', () => {
    let fixtures: ReturnType<typeof getFixtures>;

    beforeAll(() => {
        fixtures = getFixtures();
    });

    afterAll(() => {
        jest.clearAllMocks();
    });

    describe('getAllCategories', () => {
        it('When fetch all categories succeed should return categories array', async () => {
            fixtures.whenFetchAllCategoriesSucceed();
            const result = await fixtures.whenFetchCategories();
            fixtures.thenShouldReturnCategories(result);
        })

        it('When fetch all categories failed should throw exception', async () => {
            fixtures.whenFinAllCategoriesFailed();
            await expect(fixtures.whenFetchCategories()).rejects.toThrow("An error occures while getting categories");
        })
    })

    describe('createCategory', () => {
        it('When create category succeed should return category', async () => {
            fixtures.whenCreateCategorySucceed();
            const result = await fixtures.whenCreateCategory();
            fixtures.thenShouldReturnCreatedCategory(result);
        });

        it('When create category failed should throw exception', async () => {
            fixtures.whenCreateCategoryFailed();
            await expect(fixtures.whenCreateCategory()).rejects.toThrow("An error occures while creating category");
        });
    });

    describe('updateCategory', () => {
        it('When update category succeed should return updated category', async () => {
            fixtures.whenUpdateCategorySucceed();
            const result = await fixtures.whenUpdateCategory();
            fixtures.thenShouldReturnUpdatedCategory(result);
        });

        it('When category not found should throw NotFoundException', async () => {
            fixtures.whenCategoryToUpdateNotFound();
            await expect(fixtures.whenCreateCategory()).rejects.toThrow(new NotFoundException("An error occures while creating category"));
        });

        it('When create category failed should throw exception', async () => {
            fixtures.whenUpdateCategoryFailed();
            await expect(fixtures.whenCreateCategory()).rejects.toThrow(new InternalServerErrorException("An error occures while creating category"));
        });
    });

    describe('deleteCategory', () => {
        it('When delete category succeed should return deleted category', async () => {
            fixtures.whenDeleteCategorySucceed();
            const result = await fixtures.whenDeleteCategory();
            fixtures.thenShouldReturnDeletedCategory(result);
        });

        it('When category not found should throw NotFoundException', async () => {
            fixtures.whenCategoryToDeleteNotFound();
            await expect(fixtures.whenCreateCategory()).rejects.toThrow(new NotFoundException("An error occures while creating category"));
        });

        it('When create category failed should throw exception', async () => {
            fixtures.whenCategoryToDeleteFailed();
            await expect(fixtures.whenCreateCategory()).rejects.toThrow(new InternalServerErrorException("An error occures while creating category"));
        });
    });
});

const getFixtures = () => {

    // Mocks
    const categoriesMock = [
        {
            "_id": "67c894077b924ca48e3d8244",
            "name": "Test category 1",
            "__v": 0,
        },
        {
            "_id": "67c8942a7b924ca48e3d8246",
            "name": "Test category 2",
            "__v": 0,
        },
    ];

    const mockCreateCategoryBody = {
        "name": "Test category 3",
    };

    const mockCreateCategoryResolvedValue = {
        "_id": "67c8942a7b924ca48e3d8246",
        "name": "Test category 3",
        "__v": 0,
    };

    const categoryUpdateMockValue = {
        "name": "Test category 4",
    };

    const mockUpdatedCategoryResolvedValue = {
        "_id": "id-test",
        "name": "Test category 4",
        "__v": 0,
    };

    const mockDeleteCategoryResolvedValue = {
        "_id": "id-test",
        "name": "Test category 3",
        "__v": 0,
    };



    //getAll
    const whenFetchAllCategoriesSucceed = () => {
        jest.spyOn(CategoryModel, 'find').mockResolvedValue(categoriesMock);
    }

    const whenFinAllCategoriesFailed = () => {
        jest.spyOn(CategoryModel, 'find').mockRejectedValue(new Error('An error occures while getting categories'));
    }

    const whenFetchCategories = async () => {
        const categoryRepositoryImplementation = new CategoryRepositoryImplementation();
        return await categoryRepositoryImplementation.getAllCategories();
    }

    const thenShouldReturnCategories = (result) => {
        expect(result).toEqual(categoriesMock);
    }

    // create
    const whenCreateCategorySucceed = () => {
        jest.spyOn(CategoryModel.prototype, 'save').mockResolvedValue(mockCreateCategoryResolvedValue);
    }
    
    const whenCreateCategoryFailed = () => {
        jest.spyOn(CategoryModel.prototype, 'save').mockRejectedValue(new Error('An error occures while creating category'));
    }

    const whenCreateCategory = async () => {
        const categoryRepositoryImplementation = new CategoryRepositoryImplementation();
        return await categoryRepositoryImplementation.createCategory(mockCreateCategoryBody);
    }

    const thenShouldReturnCreatedCategory = (result) => {
        expect(result).toEqual(mockCreateCategoryResolvedValue);
    }

    //update
    const whenUpdateCategorySucceed = () => {
        jest.spyOn(CategoryModel, 'findByIdAndUpdate').mockResolvedValue(mockUpdatedCategoryResolvedValue);
    }

    const whenCategoryToUpdateNotFound = () => {
        jest.spyOn(CategoryModel, 'findByIdAndUpdate').mockResolvedValue(null);
    }
    
    const whenUpdateCategoryFailed = () => {
        jest.spyOn(CategoryModel, 'findByIdAndUpdate').mockRejectedValue(new Error('Update error'));

    }
    const whenUpdateCategory = async () => {
        const categoryRepositoryImplementation = new CategoryRepositoryImplementation()
        return await categoryRepositoryImplementation.updateCategory( 'id-test' ,categoryUpdateMockValue);
    }

    const thenShouldReturnUpdatedCategory = (result) => {
        expect(result).toEqual(mockUpdatedCategoryResolvedValue);
    }

    //delete
    const whenDeleteCategorySucceed = () => {
        jest.spyOn(CategoryModel, 'findByIdAndDelete').mockResolvedValue(mockDeleteCategoryResolvedValue);
    }
    
    const whenCategoryToDeleteNotFound = () => {
        jest.spyOn(CategoryModel, 'findByIdAndDelete').mockResolvedValue(null);
    }

    const whenCategoryToDeleteFailed = () => {
        jest.spyOn(CategoryModel, 'findByIdAndDelete').mockResolvedValue(new Error('Delete error'));
    }

    const whenDeleteCategory = () => {
        const categoryRepositoryImplementation = new CategoryRepositoryImplementation();
        return categoryRepositoryImplementation.deleteCategory('id-test');
    }

    const thenShouldReturnDeletedCategory = (result) => {
        expect(result).toEqual(mockDeleteCategoryResolvedValue);
    }

    return {
        //getAll
        whenFetchAllCategoriesSucceed,
        whenFinAllCategoriesFailed,
        whenFetchCategories,
        thenShouldReturnCategories,
        //create
        whenCreateCategorySucceed,
        whenCreateCategoryFailed,
        whenCreateCategory,
        thenShouldReturnCreatedCategory,
        //update
        whenUpdateCategorySucceed,
        whenCategoryToUpdateNotFound,
        whenUpdateCategoryFailed,
        whenUpdateCategory,
        thenShouldReturnUpdatedCategory,
        //delete
        whenDeleteCategorySucceed,
        whenCategoryToDeleteNotFound,
        whenCategoryToDeleteFailed,
        whenDeleteCategory,
        thenShouldReturnDeletedCategory,
    }
}