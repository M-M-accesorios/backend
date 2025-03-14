import { IsString, IsNotEmpty, IsNumber, IsArray } from 'class-validator';

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNumber()
    @IsNotEmpty()
    price: number;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    @IsNotEmpty()
    ref: string;

    @IsString()
    @IsNotEmpty()
    image: string;

    @IsArray()
    @IsNotEmpty()
    categories: string[];
};