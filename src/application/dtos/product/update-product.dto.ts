import { IsArray, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateProductDto {
    @IsString()
    @IsOptional()
    name?: string;

    @IsNumber()
    @IsOptional()
    price?: number;

    @IsString()
    @IsOptional()
    description?: string;

    @IsString()
    @IsOptional()
    ref?: string;

    @IsString()
    @IsOptional()
    image?: string;

    @IsArray()
    @IsOptional()
    categories?: string[];
};