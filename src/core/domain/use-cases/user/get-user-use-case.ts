import { Injectable, Inject } from "@nestjs/common";
import { SuccessResponse, ErrorResponse } from "src/infrastructure/types/users/index.type";
import { UserRepository } from "../../repositories/user.repository";

@Injectable()
export class GetUserUserCase {
    constructor(@Inject('UserRepository') private readonly userRepository: UserRepository) {};

    async execute(id: string): Promise<SuccessResponse | ErrorResponse> {
        try {
            return await this.userRepository.findUserById(id);
        } catch (error: unknown) {
            return {
                message: `[${GetUserUserCase.name}] ${error instanceof Error ? error.message : 'An error occures while getting user'}`,
                success: false,
            };
        };
    };
}