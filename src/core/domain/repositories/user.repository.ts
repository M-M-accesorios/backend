import { LoginUserDto } from "src/application/dtos/user/login.dto";
import { SuccessResponse, ErrorResponse, User, UserDocument } from "src/infrastructure/types/users/index.type";
import { TokenResponse } from "src/infrastructure/types/users/index.type";

export interface UserRepository {
    save(user: User): Promise<TokenResponse>;
    findUserById(id: string): Promise<UserDocument>;
    login(body: LoginUserDto): Promise<TokenResponse>;
    update(id: string, body: object): Promise<SuccessResponse | ErrorResponse>;
    delete(id: string):  Promise<SuccessResponse | ErrorResponse>;
}