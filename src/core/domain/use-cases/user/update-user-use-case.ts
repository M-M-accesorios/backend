import { Injectable, Inject } from "@nestjs/common";
import { UpdateUserDto } from "src/application/dtos/user/update-user.dto";
import { UserRepository } from "../../repositories/user.repository";
import { SuccessResponse, ErrorResponse } from "src/infrastructure/types/users/index.type";

@Injectable()
export class UpdateUserUseCase {
    constructor(@Inject('UserRepository') private readonly userRepository: UserRepository) {};

    async execute(id: string, dto: UpdateUserDto): Promise<SuccessResponse | ErrorResponse> {
        try {
            return await this.userRepository.update(id, dto);
        } catch (error) {
            return {
                message: `[${UpdateUserDto.name}] ${error instanceof Error ? error.message : 'An error occures while updating user'}`,
                success: false,
            };
        };
    };
};