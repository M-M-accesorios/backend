import { Controller, Post, Body, Get, Put, Delete, Param } from '@nestjs/common';
import { CreateUserUseCase } from 'src/core/domain/use-cases/user/create-user.use-case';
import { CreateUserDto } from 'src/application/dtos/user/create-user.dto';
import { GetUserUserCase } from 'src/core/domain/use-cases/user/get-user-use-case';
import { UpdateUserUseCase } from 'src/core/domain/use-cases/user/update-user-use-case';
import { UpdateUserDto } from 'src/application/dtos/user/update-user.dto';
import { DeleteUserUseCase } from 'src/core/domain/use-cases/user/delete-user-use-case';
import { LoginUseCase } from 'src/core/domain/use-cases/user/login-use-case';
import { LoginUserDto } from 'src/application/dtos/user/login.dto';

@Controller('users')
export class UserController {
  
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly getUserUseCase: GetUserUserCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
    private readonly loginUseCase: LoginUseCase,

  ) {}

  @Get("/:id")
  async getUserById(@Param('id') id: string) {

    return this.getUserUseCase.execute(id);
  }

  @Post('/login')
  async login(@Body() body: LoginUserDto) {
    return this.loginUseCase.execute(body);
  }

  @Post()
  async createUser(@Body() body: CreateUserDto) {
    return this.createUserUseCase.execute(body);
  }

  @Put('/:id')
  async updateUserById(@Body() body: UpdateUserDto, @Param('id') id: string) {
    return this.updateUserUseCase.execute(id, body);
  }

  @Delete("/:id")
  async deleteUserById(@Param('id') id: string) {
    return this.deleteUserUseCase.execute(id);
  }
}