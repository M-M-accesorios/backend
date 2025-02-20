import { LoginUserDto } from "src/application/dtos/user/login.dto";
import { userRepository } from "../../repositories/user.repository";
import { TokenResponse } from "src/infrastructure/types/users/index.type";

export class loginUseCase {
    constructor(public readonly userRepository: userRepository) {}

    async execute(body: LoginUserDto): Promise<TokenResponse> {
        try {
            return await this.userRepository.login(body);
        } catch(error) {
            console.error(`[${this.constructor.name}] Error while executing:`, error);
            throw error;
        }
    };
};