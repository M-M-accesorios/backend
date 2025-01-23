import { createUserDto } from "src/application/dtos/user/create-user.dto";
import { User } from "../entities/user.entity";
import { userRepository } from "../repositories/user.repository";

export class CreateUserUseCase{
    constructor(private readonly userRepository: userRepository){}

    async execute(dto : createUserDto): Promise<User> {
        const { name, email, password } = dto;
        const  existingUser = await this.userRepository.findByEmail(email);
        if(existingUser) {
            throw new Error('User already exists');
        }
        const user = new User(Date.now().toString(), name, email, password);
        return this.userRepository.save(user);
    }
}