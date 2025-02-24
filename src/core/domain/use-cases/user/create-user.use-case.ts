import { Inject, Injectable } from "@nestjs/common";
import { CreateUserDto } from "src/application/dtos/user/create-user.dto";
import { UserRepository } from "../../repositories/user.repository";
import { TokenResponse } from "src/infrastructure/types/users/index.type";

@Injectable()
export class CreateUserUseCase {
    constructor(@Inject('UserRepository') private readonly userRepository: UserRepository) {};

    async execute(dto: CreateUserDto): Promise<TokenResponse> {
        try {          
            return await this.userRepository.save(dto);
        } catch (error: unknown) {
            console.error(`[${this.constructor.name}] Error while executing:`, error);
            throw error;
        };
    };
};