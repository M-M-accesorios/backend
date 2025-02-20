import { CreateUserDto } from "src/application/dtos/user/create-user.dto";
import { userRepository } from "../../repositories/user.repository";
import { TokenResponse } from "src/infrastructure/types/users/index.type";

export class CreateUserUseCase {
    constructor(private readonly userRepository: userRepository) {}

    async execute(dto: CreateUserDto): Promise<TokenResponse> {
        try {          
            return await this.userRepository.save(dto);
        } catch (error: unknown) {
            console.error(`[${this.constructor.name}] Error while executing:`, error);
            throw error;
        }
    }
}