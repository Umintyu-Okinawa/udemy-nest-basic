import { IsString, IsNotEmpty, IsInt, IsOptional, MaxLength } from 'class-validator';

export class CreateItemDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name!: string;

  @IsInt()
  @IsNotEmpty()
  price!: number;

  @IsString()
  @IsOptional()
  description?: string;
}

