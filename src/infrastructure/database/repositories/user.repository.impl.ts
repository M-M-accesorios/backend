import { Injectable } from "@nestjs/common";
import { userRepository } from "src/core/domain/repositories/user.repository";
import { User } from "src/core/domain/entities/user.entity";

@Injectable()
export class UserRepositoryImplementation implements userRepository {
    private readonly users: User[] = [];

    async save(user: User): Promise<User> {
        this.users.push(user)
        return user;
    }

    async findByEmail(email: string): Promise<User | null> {
        console.log(this.users)
        return this.users.find(user => user.email === email) || null
    }
}