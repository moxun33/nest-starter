import { SetMetadata } from '@nestjs/common';

export const jwtConstants = {
  secret: '464b26a2836039488e8984a6ec84bd74',
  expiresIn: '90 days',
};

export const IS_PUBLIC_KEY = 'isPublic';
export const SkipJwtAuth = () => SetMetadata(IS_PUBLIC_KEY, true);
