import { Inject, Injectable } from "@nestjs/common";
import { SuccessResponse, ErrorResponse } from "src/infrastructure/types/users/index.type";
import { UserRepository } from "../../repositories/user.repository";

@Injectable()
export class DeleteUserUseCase {
    constructor(@Inject('UserRepository') private readonly userRepository: UserRepository) {};

    async execute(id: string): Promise<SuccessResponse | ErrorResponse> {
        try {
            return await this.userRepository.delete(id);
        } catch (error: unknown) {
            return {
                message: `[${DeleteUserUseCase.name}] ${error instanceof Error ? error.message : 'An error occures while deleting user'}`,
                success: false,
            };
        };
    };
};