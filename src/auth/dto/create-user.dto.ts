// src/auth/dto/create-user.dto.ts
import { IsString, IsEmail, MinLength, Matches, Validate } from 'class-validator';
import { Match } from 'src/utils/common/match.decorator';

export class CreateUserDto {
  @IsString()
  readonly username: string;

  @IsEmail()
  readonly email: string;

  @IsString()
  @MinLength(8)
  readonly password: string;

  @IsString()
  @MinLength(8)
  @Match('password', { message: 'Passwords do not match' })
  readonly confirm_password: string;
}
