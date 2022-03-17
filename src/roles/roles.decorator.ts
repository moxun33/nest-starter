/**
 * Created by xun on  2022/3/16 14:48.
 * description: roles.decorator
 */
import { Role } from './roles.interface';
import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
