import {
  IsString,
  IsEmail,
  MinLength,
  Matches,
  IsEmpty,
} from 'class-validator';
import { Match } from 'src/utils/common/match.decorator';

export class CreateUserDto {
  // @IsString()
  // @IsEmpty()
  // @Matches(/^[a-zA-Z0-9_]{3,20}$/, {
  //   message:
  //     'Username must be 3-20 characters long and can only contain letters, numbers, and underscores',
  // })
  // readonly username: string;

  @IsEmail()
  readonly email: string;

  @IsString()
  @MinLength(8)
  readonly password: string;

  @IsString()
  readonly recaptcha: string;

  @IsString()
  @MinLength(8)
  @Match('password', { message: 'Passwords do not match' })
  readonly confirm_password: string;
}
