import { Module } from "@nestjs/common";
import { UserRepositoryImplementation } from "src/infrastructure/database/repositories/user.repository.impl";
import { UserController } from "./user.controller";
import { CreateUserUseCase } from "src/core/domain/use-cases/user/create-user.use-case";
import { GetUserUserCase } from "src/core/domain/use-cases/user/get-user-use-case";
import { UpdateUserUseCase } from "src/core/domain/use-cases/user/update-user-use-case";
import { DeleteUserUseCase } from "src/core/domain/use-cases/user/delete-user-use-case";
import { LoginUseCase } from "src/core/domain/use-cases/user/login-use-case";

@Module({
    controllers: [ UserController ],
    providers: [
        CreateUserUseCase,
        GetUserUserCase,
        UpdateUserUseCase,
        DeleteUserUseCase,
        LoginUseCase,
        {
            provide: 'UserRepository',
            useClass: UserRepositoryImplementation,
        }
    ],
    exports: [ 'UserRepository' ]
})

export class UserModule {}