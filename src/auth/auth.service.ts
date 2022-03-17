import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '../user/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { jwtConstants } from './constants';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(
    username: string,
    password: string,
  ): Promise<null | Omit<User, 'password'>> {
    const existUser = await this.userService.findByUsername(username);

    if (!existUser) {
      throw new BadRequestException('用户不存在');
    }

    const isMatch = await bcrypt.compare(password, existUser.password);

    if (!isMatch) {
      throw new BadRequestException('密码不正确');
    }

    const { password: ignorePass, ...restUser } = existUser;

    return restUser;
  }

  async login(user: Partial<User>) {
    const { password, ...restUser } = user;

    const payload = { ...restUser, sub: user.id };

    return {
      token: this.jwtService.sign(payload),
      user: restUser,
      expiresIn: jwtConstants.expiresIn,
    };
  }
}
