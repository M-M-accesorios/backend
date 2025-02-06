import { ErrorResponse, SuccessResponse } from "src/infrastructure/types/users/index.type";
import { CreateUserDto } from "src/application/dtos/user/create-user.dto";
import { User } from "../entities/user.entity";
import { userRepository } from "../repositories/user.repository";

export class CreateUserUseCase {
    constructor(private readonly userRepository: userRepository){}

    async execute(dto : CreateUserDto): Promise<SuccessResponse | ErrorResponse> {
        const { firstname, lastname, email, password, phoneNumber, adress, role } = dto;
        const  existingUser = await this.userRepository.findByEmail(email);
        if(existingUser) {
            throw new Error('User already exists');
        }
        try {
            const user = new User(firstname, lastname,email, password, phoneNumber, adress, role);            
            return await this.userRepository.save(user);
            
        } catch (error: unknown) {
            return {
                message : `[${CreateUserUseCase.name}]: ${error instanceof Error  ? error.message : 'an error occures while creating user'}`,
                success: false
            }
        }
    }
}