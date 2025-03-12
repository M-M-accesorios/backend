import { Inject, Injectable } from "@nestjs/common";
import { UserDocument } from "src/infrastructure/types/users/index.type";
import { UserRepository } from "../../repositories/user.repository";

@Injectable()
export class DeleteUserUseCase {
    constructor(@Inject('UserRepository') private readonly userRepository: UserRepository) {};

    async execute(id: string): Promise<UserDocument> {
        try {
            return await this.userRepository.delete(id);
        } catch (error: unknown) {
            console.log(`[${this.constructor.name}] An error occures while deleting user`, error);
            throw error;
        };
    };
};