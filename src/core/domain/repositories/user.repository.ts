import { User } from "../entities/user.entity";
import { SuccessResponse, ErrorResponse } from "src/infrastructure/types/users/index.type";

export interface userRepository {
    save(user: User): Promise<SuccessResponse | ErrorResponse>;
    findByEmail(email: string): Promise<User | null>;
    update(id: string, body: object): Promise<User | null>;
    delete(id: string): Promise<User | null>;
}