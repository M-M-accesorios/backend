import { Module } from "@nestjs/common";
import { UserRepositoryImplementation } from "src/infrastructure/database/repositories/user.repository.impl";
import { UserController } from "./user.controller";

@Module({
    controllers: [ UserController ],
    providers: [
        {
            provide: 'UserRepository',
            useClass: UserRepositoryImplementation,
        }
    ],
    exports: [ 'UserRepository' ]
})

export class UserModule {}