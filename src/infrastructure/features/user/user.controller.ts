import { Controller, Post, Body, Inject, Get, Put, Delete, Param } from '@nestjs/common';
import { UserRepositoryImplementation } from '../../database/repositories/user.repository.impl';
import { CreateUserUseCase } from 'src/core/domain/use-cases/user/create-user.use-case';
import { CreateUserDto } from 'src/application/dtos/user/create-user.dto';
import { GetUserUserCase } from 'src/core/domain/use-cases/user/get-user-use-case';
import { UpdateUserUseCase } from 'src/core/domain/use-cases/user/update-user-use-case';
import { UpdateUserDto } from 'src/application/dtos/user/update-user.dto';

@Controller('users')
export class UserController {
  private readonly createUserUseCase: CreateUserUseCase;
  private readonly getUserUseCase: GetUserUserCase;
  private readonly updateUserUseCase: UpdateUserUseCase;

  constructor(@Inject('UserRepository') userRepository: UserRepositoryImplementation) {
    this.createUserUseCase = new CreateUserUseCase(userRepository); 
    this.getUserUseCase = new GetUserUserCase(userRepository); 
    this.updateUserUseCase = new UpdateUserUseCase(userRepository); 
  }

  @Get("/:id")
  async getUserById(@Param('id') id: string) {

    return this.getUserUseCase.execute(id);
  }

  @Post()
  async createUser(@Body() body: CreateUserDto) {
    return this.createUserUseCase.execute(body);
  }

  @Put('/:id')
  async updateUserById(@Body() body: UpdateUserDto, @Param('id') id: string) {
    return this.updateUserUseCase.execute(id, body)
  }

  @Delete("/:id")
  async deleteUserById(@Param('id') id: string) {
    return  {
      method: "delete",
      id
    }
  }
}