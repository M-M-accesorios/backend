import { Injectable, Inject } from "@nestjs/common";
import { UserDocument } from "src/infrastructure/types/users/index.type";
import { UserRepository } from "../../repositories/user.repository";

@Injectable()
export class GetUserUserCase {
    constructor(@Inject('UserRepository') private readonly userRepository: UserRepository) {};

    async execute(id: string): Promise<UserDocument> {
        try {
            return await this.userRepository.findUserById(id);
        } catch (error: unknown) {
            console.error(`[${this.constructor.name}] Error while getting user:`, error);
            throw error;
        };
    };
}