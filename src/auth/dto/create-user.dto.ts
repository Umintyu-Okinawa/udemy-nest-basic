
import { IsString, MaxLength, IsNotEmpty, IsEmail, IsEnum, IsStrongPassword } from "class-validator";
import { UserStatus } from "@prisma/client";

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name!: string;

  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
    minUppercase: 1,
  })
  @IsNotEmpty()
  password!: string;

  @IsEnum(UserStatus)
  @IsNotEmpty()
  status!: UserStatus;
}