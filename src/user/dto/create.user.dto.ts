import { IsOptional, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(3, 255)
  username: string;

  @IsString()
  @Length(6, 255)
  password: string;

  @IsString()
  @Length(2, 255)
  firstName: string;

  @IsString()
  @Length(2, 255)
  lastName: string;

  @IsString()
  @IsOptional()
  @Length(0, 255)
  avatar?: string;
}
