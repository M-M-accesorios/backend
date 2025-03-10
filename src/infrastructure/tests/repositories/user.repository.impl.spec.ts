import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { HttpException } from "@nestjs/common";
import { UserModel } from "../../database/models/user.model";
import { UserRepositoryImplementation } from "../../database/repositories/user.repository.impl";

jest.mock("bcrypt");
jest.mock("jsonwebtoken", () => ({
    sign: jest.fn(),
}));
jest.mock("../../database/models/user.model", () => {
    return {
        UserModel: jest.fn().mockImplementation(() => ({
            save: jest.fn(),
        })),
    };
});

UserModel.findByIdAndUpdate = jest.fn();
UserModel.findById = jest.fn();
UserModel.findByIdAndDelete = jest.fn();

describe("UserRepositoryImplementation", () => {
    let fixtures: ReturnType<typeof getFixtures>;

    beforeAll(() => {
        fixtures = getFixtures();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("save", () => {

        it("When save succeed should return success response", async () => {
            fixtures.whenBcryptHashSucceeds();
            fixtures.whenUserSaveSucceeds();
            fixtures.whenJwtSignSucceeds();

            const result = await fixtures.whenSaveUser();

            fixtures.thenShouldCallBcryptHash();
            fixtures.thenShouldCallUserSave();
            fixtures.thenShouldCallJwtSign();
            fixtures.thenShouldReturnExpectedResult(result);
        });

        it("when bcrypt fails should throw an exception", async () => {
            fixtures.whenBcryptHashFails();

            await expect(fixtures.whenSaveUser()).rejects.toThrow(
                "Password hashing failed"
            );
        });

        it("when user save fails should throw an exception", async () => {
            fixtures.whenUserSaveFails();

            await expect(fixtures.whenSaveUser()).rejects.toThrow(
                "User creation failed"
            );
        });
        
        it("when JWT signing fails should throw an exception", async () => {
            fixtures.whenUserSaveSucceeds();
            fixtures.whenJwtSignFails();

            await expect(fixtures.whenSaveUser()).rejects.toThrow(
                "Token generation failed"
            );
        });
    });

    describe('findById', () => {
       
        it('When user search succeed then return success response',  async () => {
            fixtures.whenUserSearchSucceeds();
            const result = await fixtures.whenFetchById();
            fixtures.thenReturnSuccessResponse(result, {
                _id: "123456789",
                firstname: "John",
                lastname: "Doe",
                email: "test@test.com",
                password: "hashedpassword",
                address: "146 rue des rossignoles",
                phoneNumber: "0674502459",
                role: "customer",
            });
        });

        it('When user search return null then return error response',  async () => {
            fixtures.whenUserSearchReturnNull();
            await expect(fixtures.whenFetchById()).rejects.toThrow(new HttpException('User not found', 404));
        });

        // it('When user search fail then return error response',  async () => {
        //     fixtures.whenUserSearchFailed();
        //     await expect(fixtures.whenFetchById()).rejects.toThrow("An error occures while getting user");
        // });
    });
    describe('update', () => {
        
        it('When user update succeed then return success response',  async () => {
            fixtures.whenUpdateUserSucceed();
            const result = await fixtures.whenUpdateUser();
            fixtures.thenReturnSuccessResponse(result,{
                _id: "123456789",
                firstname: "John",
                lastname: "Doe",
                email: "test@test.com",
                password: "hashedpassword",
                address: "146 rue des rossignoles",
                phoneNumber: "0674502459",
                role: "customer",
            });
        });

        it('When user update return error then return error response',  async () => {
            fixtures.whenUpdateUserFail();
            await expect(fixtures.whenUpdateUser()).rejects.toThrow(new Error('An error occures while updating user'));

        });
    });

    describe('delete', () => {

        it('When user delete succeed then return success response',  async () => {
            fixtures.whenDeleteUserSucceed();
            const result = await fixtures.whenDeleteUser();
            fixtures.thenReturnSuccessResponse(result,{
                _id: "123456789",
                firstname: "John",
                lastname: "Doe",
                email: "test@test.com",
                password: "hashedpassword",
                address: "146 rue des rossignoles",
                phoneNumber: "0674502459",
                role: "customer",
            });
        });

        it('When user delete throw exception then return throw error',  async () => {
            fixtures.whenDeleteUserFail();
            await expect(fixtures.whenDeleteUser()).rejects.toThrow(new Error('An error occures while deleting user'));
        });
    });
});

const getFixtures = () => {
    //save user constants
    const mockHashedPassword = "hashedpassword";
    const mockToken = "mockToken";
    const mockUser = {
        firstname: "John",
        lastname: "Doe",
        email: "test@test.com",
        password: 'plainpassword',
        address: '146 rue des rossignoles',
        phoneNumber: '0674502459',
        role: 'customer',
    };

    //global consts
    const userId = '123456789';

    //update body user
    const userBodyToUpdate = {
        firstname: "John",
        lastname: "Franck",
        email: "test@test.com",
        password: "hashedpassword",
        address: "146 rue des rossignoles",
        phoneNumber: "0674502459",
        role: "admin",
}

    //save user declaration cases
    const whenBcryptHashSucceeds = () => {
        (bcrypt.hash as jest.Mock).mockResolvedValueOnce(mockHashedPassword);
    };

    const whenBcryptHashFails = () => {
        (bcrypt.hash as jest.Mock).mockRejectedValueOnce(new Error("Password hashing failed"));
    };

    const whenUserSaveSucceeds = () => {
        (UserModel as unknown as jest.Mock).mockImplementation((data) => ({
            _id: "123456789",
            ...data,
            save: jest.fn().mockResolvedValue({
                _id: "12345678951225",
                firstname: "John",
                lastname: "Doe",
                email: "test@test.com",
                password: "hashedpassword",
                address: "146 rue des rossignoles",
                phoneNumber: "0674502459",
                role: "customer",
            }),
        }));
    };

    const whenUserSaveFails = () => {
        (UserModel as unknown as jest.Mock).mockImplementation(() => ({
            save: jest.fn().mockRejectedValue(new Error("User creation failed")),
        }));
    };

    const whenJwtSignSucceeds = () => {
        (jwt.sign as jest.Mock).mockReturnValueOnce(mockToken);
    };

    const whenJwtSignFails = () => {
        (jwt.sign as jest.Mock).mockImplementation(() => {
            throw new Error("Token generation failed");
        });
    };

    const whenSaveUser = async () => {
        const userRepositoryImplementation = new UserRepositoryImplementation();
        return userRepositoryImplementation.save(mockUser);
    };

    const thenShouldCallBcryptHash = () => {
        expect(bcrypt.hash).toHaveBeenCalledWith("plainpassword", 12);
    };

    const thenShouldCallUserSave = () => {
        expect(UserModel).toHaveBeenCalledWith(mockUser);
    };

    const thenShouldCallJwtSign = () => {
        expect(jwt.sign).toHaveBeenCalledWith(
            { id: "123456789", role: "customer" },
            process.env.TOKEN_SECRET,
            { expiresIn: "4h" }
        );
    };

    const thenShouldReturnExpectedResult = (result: any) => {
        expect(result).toEqual({
            token: mockToken,
        });
    };

    //find user by id cases
    const whenUserSearchSucceeds = () => {
        (UserModel.findById as jest.Mock).mockImplementation(() => ({
            select: jest.fn().mockResolvedValue({
                _id: userId,
                firstname: "John",
                lastname: "Doe",
                email: "test@test.com",
                password: "hashedpassword",
                address: "146 rue des rossignoles",
                phoneNumber: "0674502459",
                role: "customer",
            }),
        }));
    };
    const whenUserSearchReturnNull = () => {
        (UserModel.findById as jest.Mock).mockImplementation(() => ({
            select: jest.fn().mockResolvedValue(null),
        }));
    };

    const whenUserSearchFailed = () => {
        // jest.spyOn(UserModel, 'findById').mockRejectedValue(new HttpException("An error occurs while getting user", HttpStatus.INTERNAL_SERVER_ERROR));
        jest.spyOn(UserModel, 'findById').mockRejectedValue(new Error('An error occures while fetching user'));
    };

    const whenFetchById = async () => {
        const userRepositoryImplementation = new UserRepositoryImplementation();
        return await userRepositoryImplementation.findUserById(userId);
    };

    const thenReturnSuccessResponse = (result, data) => {
        expect(result).toEqual(data);
    };

    //update user cases
    const whenUpdateUserSucceed = () => {
        (UserModel.findByIdAndUpdate as jest.Mock).mockImplementation(() => ({
                _id: userId,
                firstname: "John",
                lastname: "Doe",
                email: "test@test.com",
                password: "hashedpassword",
                address: "146 rue des rossignoles",
                phoneNumber: "0674502459",
                role: "customer",
        }));
    };

    const whenUpdateUserFail = () => {
        jest.spyOn(UserModel, 'findByIdAndUpdate').mockRejectedValue(new Error('An error occures while updating user'));
    };

    const whenUpdateUser = () => {
        const userRepositoryImplementation = new UserRepositoryImplementation();
        return userRepositoryImplementation.update(userId, userBodyToUpdate);
    };

    //delete user cases
    const whenDeleteUserSucceed = () => {
        jest.spyOn(UserModel, 'findByIdAndDelete').mockResolvedValue({
            _id: userId,
            firstname: "John",
            lastname: "Doe",
            email: "test@test.com",
            password: "hashedpassword",
            address: "146 rue des rossignoles",
            phoneNumber: "0674502459",
            role: "customer",
        });
    };

    const whenDeleteUserFail = () => {
        jest.spyOn(UserModel, 'findByIdAndDelete').mockRejectedValue(new Error('An error occures while deleting user'));
        
    };

    const whenDeleteUser = () => {
        const userRepositoryImplementation = new UserRepositoryImplementation();
        return userRepositoryImplementation.delete(userId);
    }

    // global case
    const thenReturnErrorResponse = (result, message) => {
        expect(result).toEqual({
            message: message,
            success: false,
        });
    };
    
    return {
        //save user cases
        whenBcryptHashSucceeds,
        whenBcryptHashFails,
        whenUserSaveSucceeds,
        whenUserSaveFails,
        whenJwtSignSucceeds,
        whenJwtSignFails,
        whenSaveUser,
        thenShouldCallBcryptHash,
        thenShouldCallUserSave,
        thenShouldCallJwtSign,
        thenShouldReturnExpectedResult,
        //find user by id cases
        whenUserSearchSucceeds,
        whenUserSearchReturnNull,
        whenUserSearchFailed,
        whenFetchById,
        thenReturnSuccessResponse,
        //update user cases
        whenUpdateUserSucceed,
        whenUpdateUserFail,
        whenUpdateUser,
        //update user cases
        whenDeleteUserSucceed,
        whenDeleteUserFail,
        whenDeleteUser,
        // global case
        thenReturnErrorResponse,
    }
}