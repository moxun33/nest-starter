import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Controller('user')
@ApiTags('user')
@ApiBearerAuth('jwt')
//@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly userService: UsersService) {
    this.userService = userService;
  }

  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ type: User })
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('create')
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
  @ApiResponse({ type: [User] })
 // @Roles(Role.Admin)
  // @UseGuards(RolesGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('list')
  async findAll() {
    return this.userService.findAll();
  }
  @ApiResponse({ type: User, description: '获取用户详情' })
  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: string) {
    return this.userService.findById(+id);
  }

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
