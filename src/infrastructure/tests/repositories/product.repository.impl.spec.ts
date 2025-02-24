import { NotFoundException } from "@nestjs/common";
import { ProductModel } from "../../database/models/product.model"
import { ProductRepositoryImplementation } from "../../database/repositories/product.repository.impl";

describe('ProductRepositoryImplementation', () => {
    let fixtures: ReturnType<typeof getFixtures>;

    beforeAll(() => {
        fixtures = getFixtures();
    });

    afterAll(() => {
        jest.clearAllMocks();
    });

    describe('getAllProducts', () => {
        it('When all products fetch succeed should return products array', async () => {
            fixtures.whenFindAllUsersSucceed();
            const result = await fixtures.whenFindAllUsers();
            fixtures.thenShouldReturnProductsArray(result);
        });

        it('When all products fetch fail should throw error', async () => {
            fixtures.whenFindAllUsersFailed();
            await expect(fixtures.whenFindAllUsers()).rejects.toThrow("An error occures while getting products");
        })
    });

    describe('createProduct', () => {
        it('When create product succeed should return new product', async () => {
            fixtures.whenCreateProductSucceed();
            const result = await fixtures.whenCreateProduct();
            fixtures.thenShouldReturnNewProduct(result);
        });

        it('When create products fail should throw error', async () => {
            fixtures.whenCreateProductFail();
            await expect(fixtures.whenCreateProduct()).rejects.toThrow("An error occures while creating product");
        });
    });

    describe('findBProductyId', () => {
        it('When get product by id succeed should return one product', async () => {
            fixtures.whenFindByIdSucceed();
            const result = await fixtures.whendFindProductById();
            fixtures.thenShouldReturnFoundedProduct(result);
        });

        it('When product not found should throw error with status 404', async () => {
            fixtures.whenProductNotFound();
            await expect(fixtures.whendFindProductById()).rejects.toThrow(new NotFoundException('Product not found'));
        })
        
        it('When product fetch fail should throw an exception', async () => {
            fixtures.whenFindByIdFailed();
            await expect(fixtures.whendFindProductById()).rejects.toThrow(new Error('An error occures while fetching product'));
        })
    })

    describe('updateProduct', () => {
        it('When update product succeed should return new product', async () => {
            fixtures.whenProductUpdateSucceed();
            const result = await fixtures.whenProductUpdateById();
            fixtures.thenShouldReturnUpdatedProduct(result);
        });

        it('When update product not found should return not found exception', async () => {
            fixtures.whenProductUpdateNotFound();
            await expect(fixtures.whenProductUpdateById()).rejects.toThrow(new NotFoundException('Product not found'));
        });

        it('When product fetch fail should throw an exception', async () => {
            fixtures.whenProductUpdateFailed();
            await expect(fixtures.whenProductUpdateById()).rejects.toThrow(new Error('An error occures while updating product'));
        });
    });

    describe('deleteProductById', () => {
        it('When delete product succeed should return deleted product', async () => {
            fixtures.whenProductDeleteSucceed();
            const result = await fixtures.whenProductDeleteById();
            fixtures.thenShouldReturnDeleteProduct(result);
        });

        it('When update product not found should return not found exception', async () => {
            fixtures.whenDeleteProductNotFound();
            await expect(fixtures.whenProductDeleteById()).rejects.toThrow(new NotFoundException('Product not found'));
        });

        it('When product fetch fail should throw an exception', async () => {
            fixtures.whenProductDeleteFailed();
            await expect(fixtures.whenProductDeleteById()).rejects.toThrow(new Error('An error occures while deleting product'));
        });
    })
});

const getFixtures = () => {

    // Mock values
    const mockProducts = [
        {
            "name": "product 5 - Test",
            "price": 15000,
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas neque dolor, pharetra vitae lectus ut, ornare ultricies lacus. Donec feugiat velit eget lorem mattis, in eleifend nisi placerat. Duis dignissim odio convallis massa lacinia, non malesuada metus interdum. Vivamus eget ligula quis purus pharetra ornare. Vestibulum non accumsan orci. Maecenas.",
            "ref": "MM25979412",
            "image": "/img/product5.jpg"
        },
        {
            "name": "product 5 - Test",
            "price": 40000,
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas neque dolor, pharetra vitae lectus ut, ornare ultricies lacus. Donec feugiat velit eget lorem mattis, in eleifend nisi placerat. Duis dignissim odio convallis massa lacinia, non malesuada metus interdum. Vivamus eget ligula quis purus pharetra ornare. Vestibulum non accumsan orci. Maecenas.",
            "ref": "MM25979412",
            "image": "/img/product5.jpg"
        },
    ];


    const mockProduct = {
        "name": "product 12 - Test",
        "price": 400000,
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas neque dolor, pharetra vitae lectus ut, ornare ultricies lacus. Donec feugiat velit eget lorem mattis, in eleifend nisi placerat. Duis dignissim odio convallis massa lacinia, non malesuada metus interdum. Vivamus eget ligula quis purus pharetra ornare. Vestibulum non accumsan orci. Maecenas.",
        "ref": "MM25979412",
        "image": "/img/product12.jpg",
    };

    const mockUpdatedProduct = {
        "name": "product 12 - Test",
        "price": 30000,
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas neque dolor, pharetra vitae lectus ut, ornare ultricies lacus. Donec feugiat velit eget lorem mattis, in eleifend nisi placerat. Duis dignissim odio convallis massa lacinia, non malesuada metus interdum. Vivamus eget ligula quis purus pharetra ornare. Vestibulum non accumsan orci. Maecenas.",
        "ref": "MM25979412",
        "image": "/img/product12.jpg",
    };

    const mockUpdateBody = {
        "price": 30000,
    };

    const mockProductId = '1234567890';

    //findAll
    const whenFindAllUsersSucceed = () => {
        jest.spyOn(ProductModel, 'find').mockResolvedValue(mockProducts);
    };

    const whenFindAllUsersFailed = () => {
        jest.spyOn(ProductModel, 'find').mockRejectedValue(new Error("An error occures while getting products"));
    };

    const whenFindAllUsers = async () => {
        const productRepositoryImplementation = new ProductRepositoryImplementation();
        return await productRepositoryImplementation.getAllProducts();
    };

    const thenShouldReturnProductsArray = (result) => {
        expect(result).toEqual(mockProducts);
    };
    
    //create 
    const whenCreateProductSucceed = () => {
        jest.spyOn(ProductModel.prototype, 'save').mockResolvedValue(mockProduct);
    };

    const whenCreateProductFail = () => {
        jest.spyOn(ProductModel.prototype, 'save').mockRejectedValue(new Error('An error occures while creating product'));
    };

    const whenCreateProduct = async () => {
        const productRepositoryImplementation = new ProductRepositoryImplementation();
        return await productRepositoryImplementation.createProduct(mockProduct);
    };

    const thenShouldReturnNewProduct = (result) => {
        expect(result).toEqual(mockProduct);
    };

    //findById
    const whenFindByIdSucceed = () => {
        jest.spyOn(ProductModel, 'findById').mockResolvedValue(mockProduct);
    };

    const whenFindByIdFailed = () => {
        jest.spyOn(ProductModel, 'findById').mockRejectedValue(new Error('An error occures while fetching product'));
    };

    const whenProductNotFound = () => {
        jest.spyOn(ProductModel, "findById").mockResolvedValue(null);
    };

    const whendFindProductById = async () => {
        const productRepositoryImplementation = new ProductRepositoryImplementation();
        return await productRepositoryImplementation.getProductById(mockProductId);
    };

    const thenShouldReturnFoundedProduct = (result) => {
        expect(result).toEqual(mockProduct);
    };

    //update
    const whenProductUpdateSucceed = () => {
        jest.spyOn(ProductModel, 'findOneAndUpdate').mockResolvedValue(mockUpdatedProduct);
    };

    const whenProductUpdateFailed = () => {
        jest.spyOn(ProductModel, 'findByIdAndUpdate').mockRejectedValue(new Error('An error occures while updating product'));
    };

    const whenProductUpdateNotFound = () => {
        jest.spyOn(ProductModel, 'findOneAndUpdate').mockResolvedValue(null);
    };

    const whenProductUpdateById = () => {
        const productRepositoryImplementation = new ProductRepositoryImplementation();
        return productRepositoryImplementation.updateProductById(mockProductId, mockUpdateBody);
    };

    const thenShouldReturnUpdatedProduct = (result) => {
        expect(result).toEqual(mockUpdatedProduct);
    };

    //delete
    const whenProductDeleteSucceed = () => {
        jest.spyOn(ProductModel, 'findByIdAndDelete').mockResolvedValue(mockProduct);
    };

    const whenProductDeleteFailed = () => {
        jest.spyOn(ProductModel, 'findByIdAndDelete').mockRejectedValue(new Error('An error occures while deleting product'));
    };

    const whenDeleteProductNotFound = () => {
        jest.spyOn(ProductModel, "findByIdAndDelete").mockResolvedValue(null);
    };

    const whenProductDeleteById = async () => {
        const productRepositoryImplementation = new ProductRepositoryImplementation();
        return await productRepositoryImplementation.deleteProductById(mockProductId);
    };

    const thenShouldReturnDeleteProduct = (result) => {
        expect(result).toEqual(mockProduct);
    };


    return {
        //findAll
        whenFindAllUsersSucceed,
        whenFindAllUsersFailed,
        whenFindAllUsers,
        thenShouldReturnProductsArray,
        //create
        whenCreateProductSucceed,
        whenCreateProductFail,
        whenCreateProduct,
        thenShouldReturnNewProduct,
        //findById
        whenFindByIdSucceed,
        whenFindByIdFailed,
        whenProductNotFound,
        whendFindProductById,
        thenShouldReturnFoundedProduct,
        //update
        whenProductUpdateSucceed,
        whenProductUpdateFailed,
        whenProductUpdateNotFound,
        whenProductUpdateById,
        thenShouldReturnUpdatedProduct,
        //delete
        whenProductDeleteSucceed,
        whenDeleteProductNotFound,
        whenProductDeleteById,
        thenShouldReturnDeleteProduct,
        whenProductDeleteFailed,
    };
};