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
            user.password = await bcrypt.hash(user.password, 12)
            const NewUser = new UserModel(user.getCreateData()) 
            await NewUser.save()

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
                message: error instanceof Error ? error.message :  "An error occures while creating user"
            }
        }
    }

    async findByEmail(email: string): Promise<User | null> {
        return  null
    }

    async update(id: string, body: object): Promise<User | null> {
        return null
    }

    async delete(id: string): Promise<User | null> {
        return null
    }
}