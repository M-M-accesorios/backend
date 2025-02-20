import { IsString, IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class LoginUserDto {
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    password: string;
}