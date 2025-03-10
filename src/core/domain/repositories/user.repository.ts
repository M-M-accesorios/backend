import { LoginUserDto } from "src/application/dtos/user/login.dto";
import { User, UserDocument } from "src/infrastructure/types/users/index.type";
import { TokenResponse } from "src/infrastructure/types/users/index.type";

export interface UserRepository {
    save(user: User): Promise<TokenResponse>;
    findUserById(id: string): Promise<UserDocument>;
    login(body: LoginUserDto): Promise<TokenResponse>;
    update(id: string, body: object): Promise<UserDocument>;
    delete(id: string): Promise<UserDocument>;
}