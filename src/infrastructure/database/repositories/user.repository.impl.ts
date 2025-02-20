import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { BadRequestException, HttpException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { userRepository } from "src/core/domain/repositories/user.repository";
import { ErrorResponse, SuccessResponse, User } from 'src/infrastructure/types/users/index.type';
import { UserModel } from '../models/user.model';
import { LoginUserDto } from 'src/application/dtos/user/login.dto';
import { TokenResponse } from 'src/infrastructure/types/users/index.type';

@Injectable()
export class UserRepositoryImplementation implements userRepository {

    async save(user: User): Promise<TokenResponse> {
        try{
            const hashedPassword = await bcrypt.hash(user.password, 12);
            user.password = hashedPassword;
            user.role = 'customer';
            const NewUser = new UserModel(user); 
            await NewUser.save();

            const token = jwt.sign({
                id: NewUser._id,
                role: NewUser.role,
            }, process.env.TOKEN_SECRET, {
                expiresIn: '4h'
            });

            return {
                token,
            };
        } catch(error: unknown) {
            if (error instanceof Error && error.message.includes("duplicate key")) {
                throw new BadRequestException("Email already exists");
            }
            const message = error instanceof Error ? error.message : 'An unexpected error occurred while creating user';
            console.error(`[${UserRepositoryImplementation.name}]${message}`);
            throw new InternalServerErrorException(message);
        };
    };

    async login(body: LoginUserDto): Promise<TokenResponse> {
        try{
            const user = await UserModel.findOne({ email: body.email });
            if(!user){
                throw new NotFoundException('User not found');
            }
            const token = jwt.sign({
                id: user._id,
                role: user.role,
            }, process.env.TOKEN_SECRET, {
                expiresIn: '4h'
            });

            return {
                token,
            };
        } catch(error: unknown) {
            throw new HttpException(
                error instanceof Error ? error.message : 'An error occurred while logging in',
                error instanceof HttpException ? error.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR,
            );
        };
    };

    async findUserById(id: string): Promise<SuccessResponse | ErrorResponse> {
        try {
            const user = await UserModel.findById(id).select('-__v');
            if(!user){
                throw Error('User not found');
            }
            return  {
                data: user,
                success: true,
            };
        } catch (error) {
            return{
                success: false,
                message: `[${UserRepositoryImplementation.name}] ${error instanceof Error ? error.message : 'An error occures while getting user'}`,
            };
        }
    }

    async update(id: string, body: object): Promise<SuccessResponse | ErrorResponse> {
        try {
            const updatedUser = await UserModel.findByIdAndUpdate(id, body, { new: true });
            return {
                success: true,
                data: updatedUser,
            };
        } catch (error) {
            return {
                success: false,
                message: `[${UserRepositoryImplementation.name}] ${error instanceof Error ? error.message : 'An error occures while updating user'}`,
            };
        }
    }

    async delete(id: string): Promise<SuccessResponse | ErrorResponse> {
        try {
            const deletedUser = await UserModel.findByIdAndDelete(id);
            return {
                success: true,
                data: deletedUser,
            };
        } catch (error) {
            return {
                success: false,
                message: `[${UserRepositoryImplementation.name}] ${error instanceof Error ? error.message : 'An error occures while deleting user'}`,
            };
        }
    }
}