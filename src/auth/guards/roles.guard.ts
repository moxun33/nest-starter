/**
 * Created by xun on  2022/3/17 11:57.
 * description: roles.guard
 */
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../../core/roles/roles.interface';
import { ROLES_KEY } from '../../core/roles/roles.decorator';
import { UsersService as UserService } from '../../user/users.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private userService: UserService) {}

  async canActivate(context: ExecutionContext) {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    const adminUser = await this.userService.checkAdmin(user.id);

    return !!adminUser;
  }
}
