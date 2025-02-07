import { UpdateUserDto } from "src/application/dtos/user/update-user.dto";
import { userRepository } from "../../repositories/user.repository";

export class UpdateUserUseCase {
    constructor(public readonly userRepository: userRepository) {}

    execute(id: string, dto: UpdateUserDto) {
        try {
            return this.userRepository.update(id, dto);
        } catch (error) {
            return {
                message: `[${UpdateUserDto.name}] ${error instanceof Error ? error.message : 'An error occures while updating user'}`,
                success: false,
            };
        }
    }
}