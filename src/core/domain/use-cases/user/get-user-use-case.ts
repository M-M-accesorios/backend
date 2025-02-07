import { userRepository } from "../../repositories/user.repository";

export class GetUserUserCase {
    constructor(private readonly userRepository: userRepository) {}

    execute(id: string) {
        try {
            return this.userRepository.findUserById(id);
        } catch (error: unknown) {
            return {
                message: `[${GetUserUserCase.name}] ${error instanceof Error ? error.message : 'An error occures while getting user'}`,
                success: false,
            };
        }
    }
}