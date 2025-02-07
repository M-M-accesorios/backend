import { User } from "../entities/user.entity";
import { SuccessResponse, ErrorResponse } from "src/infrastructure/types/users/index.type";

export interface userRepository {
    save(user: User): Promise<SuccessResponse | ErrorResponse>;
    findUserById(id: string): Promise<SuccessResponse | ErrorResponse>;
    update(id: string, body: object): Promise<SuccessResponse | ErrorResponse>;
    delete(id: string): Promise<User | null>;
}