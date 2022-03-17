import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '../core/base.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService extends BaseService<User> {

  constructor(
    @InjectRepository(User) private readonly userRep: Repository<User>,
  ) {
    super(userRep);
  }
  async create(createUserDto: CreateUserDto) {
    const { username, password, email } = createUserDto;
    if (await this.findByUsername(username)) {
      throw new BadRequestException('用户名已存在');
    }
    const user = new User();
    user.username = username;
    user.password = password;
    user.email = email;
    user.isAdmin = 1;

    return this.userRep.save(user);
  }

  async findByUsername(username: string) {
    return this.userRep.findOne({
      where: { username },
    });
  }

  async checkAdmin(id: number) {
    return this.userRep.findOne({
      where: { id, is_admin: 1 },
    });
  }
}
