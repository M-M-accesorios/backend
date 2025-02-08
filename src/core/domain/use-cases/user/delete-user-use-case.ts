import { SuccessResponse, ErrorResponse } from "src/infrastructure/types/users/index.type";
import { userRepository } from "../../repositories/user.repository";

export class DeleteUserUseCase {
    constructor(private readonly userRepository: userRepository) {}

    async execute(id: string): Promise<SuccessResponse | ErrorResponse> {
        try {
            return await this.userRepository.delete(id);
        } catch (error: unknown) {
            return {
                message: `[${DeleteUserUseCase.name}] ${error instanceof Error ? error.message : 'An error occures while deleting user'}`,
                success: false,
            };
        }
    }
}