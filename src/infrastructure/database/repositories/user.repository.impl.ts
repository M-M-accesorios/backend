import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { Injectable } from "@nestjs/common";
import { userRepository } from "src/core/domain/repositories/user.repository";
import { User } from "src/core/domain/entities/user.entity";
import { ErrorResponse, SuccessResponse } from 'src/infrastructure/types/users/index.type';
import { UserModel } from '../models/user.model';

@Injectable()
export class UserRepositoryImplementation implements userRepository {

    async save(user: User): Promise<SuccessResponse | ErrorResponse> {
        try{
            const hashedPassword = await bcrypt.hash(user.getPassword(), 12);
            user.setPassword(hashedPassword);
            const NewUser = new UserModel(user.getCreateData()); 
            await NewUser.save();

            const token = jwt.sign({
                id: NewUser._id,
                role: NewUser.role
                
            }, process.env.TOKEN_SECRET, {
                expiresIn: '4h'
            });
            
            return {
                token,
                success: true
            };
        } catch(error: unknown) {
            return {
                success: false,
                message: `[${UserRepositoryImplementation.name}] ${error instanceof Error ? error.message :  "An error occures while creating user"}`,
            };
        }
    }

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
            const updatedUser = await UserModel.findByIdAndUpdate(id, body, { new: true })
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

    async delete(id: string): Promise<User | null> {
        return null
    }
}