import { Injectable, Inject } from "@nestjs/common";
import { LoginUserDto } from "src/application/dtos/user/login.dto";
import { UserRepository } from "../../repositories/user.repository";
import { TokenResponse } from "src/infrastructure/types/users/index.type";

@Injectable()
export class LoginUseCase {
    constructor(@Inject('UserRepository') private readonly userRepository: UserRepository) {}

    async execute(body: LoginUserDto): Promise<TokenResponse> {
        try {
            return await this.userRepository.login(body);
        } catch(error) {
            console.error(`[${this.constructor.name}] Error while Login:`, error);
            throw error;
        };
    };
};