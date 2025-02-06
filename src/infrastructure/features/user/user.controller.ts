import { Controller, Post, Body, Inject, Get, Put, Delete, Param } from '@nestjs/common';
import { UserRepositoryImplementation } from '../../database/repositories/user.repository.impl';
import { CreateUserUseCase } from 'src/core/domain/use-cases/create-user.use-case';
import { CreateUserDto } from 'src/application/dtos/user/create-user.dto';

@Controller('users')
export class UserController {
  private readonly createUserUseCase: CreateUserUseCase;
  constructor(@Inject('UserRepository') userRepository: UserRepositoryImplementation) {
    this.createUserUseCase = new CreateUserUseCase(userRepository); 
  }

  @Get("/:id")
  async getUserById(@Param('id') id: string) {
    return {
      method: "get",
      id
    }
  }

  @Post()
  async createUser(@Body() body: CreateUserDto) {
    return this.createUserUseCase.execute(body);
  }

  @Put('/:id')
  async updateUserById(@Body() body: object, @Param('id') id: string) {
    return {
      method: 'PUT',
      id,
      body
    };
  }

  @Delete("/:id")
  async deleteUserById(@Param('id') id: string) {
    return  {
      method: "delete",
      id
    }
  }
}