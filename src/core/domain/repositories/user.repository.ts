import { User } from "../entities/user.entity";

export interface userRepository{
    save(user: User): Promise<User>;
    findByEmail(email: string): Promise<User | null>;
}