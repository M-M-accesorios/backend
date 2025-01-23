import { Controller, Post, Body, Inject } from '@nestjs/common';
import { UserRepositoryImplementation } from '../../database/repositories/user.repository.impl';
import { CreateUserUseCase } from 'src/core/domain/use-cases/create-user.use-case';
import { createUserDto } from 'src/application/dtos/user/create-user.dto';

@Controller('users')
export class UserController {
  private readonly createUserUseCase: CreateUserUseCase;

  constructor(@Inject('UserRepository') userRepository: UserRepositoryImplementation) {
    this.createUserUseCase = new CreateUserUseCase(userRepository);
  }

  @Post()
  async createUser(@Body() body: createUserDto) {
    return this.createUserUseCase.execute(body);
  }
}