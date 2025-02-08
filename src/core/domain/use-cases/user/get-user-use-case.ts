import { SuccessResponse, ErrorResponse } from "src/infrastructure/types/users/index.type";
import { userRepository } from "../../repositories/user.repository";

export class GetUserUserCase {
    constructor(private readonly userRepository: userRepository) {}

    async execute(id: string): Promise<SuccessResponse | ErrorResponse> {
        try {
            return await this.userRepository.findUserById(id);
        } catch (error: unknown) {
            return {
                message: `[${GetUserUserCase.name}] ${error instanceof Error ? error.message : 'An error occures while getting user'}`,
                success: false,
            };
        }
    }
}