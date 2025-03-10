import { Injectable, Inject } from "@nestjs/common";
import { UpdateUserDto } from "src/application/dtos/user/update-user.dto";
import { UserRepository } from "../../repositories/user.repository";
import { UserDocument } from "src/infrastructure/types/users/index.type";

@Injectable()
export class UpdateUserUseCase {
    constructor(@Inject('UserRepository') private readonly userRepository: UserRepository) {};

    async execute(id: string, dto: UpdateUserDto): Promise<UserDocument> {
        try {
            return await this.userRepository.update(id, dto);
        } catch (error) {
            console.log(`[${this.constructor.name}] An error occures while updating user`, error)
            throw error;
        };
    };
};