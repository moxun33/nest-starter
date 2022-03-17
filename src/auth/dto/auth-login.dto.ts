import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

/**
 * Created by wxun on 2022/2/13 17:48.
 * description: create-keyword.dto
 */
export class AuthLoginDto {
  @ApiProperty({ type: String, description: '用户名' })
  @IsString()
  username: string;

  @ApiProperty({ type: String, description: '密码' })
  @IsString()
  password: string;
}
