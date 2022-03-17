/**
 * Created by xun on  2022/3/16 14:38.
 * description: create-user.dto
 */
import { ApiProperty } from '@nestjs/swagger';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { IsAlphanumeric, IsEmail, IsString, MaxLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: '用户名' })
  @IsAlphanumeric()
  @MaxLength(14)
  username: string;

  @ApiProperty({ description: '密码' })
  @IsString()
  password: string;

  @ApiProperty({ required: false, description: '邮箱' })
  @IsEmail()
  email: string;
}
