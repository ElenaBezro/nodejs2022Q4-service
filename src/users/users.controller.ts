import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  NotFoundException,
  ParseUUIDPipe,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';

@Controller('user')
export class UsersController {
  usersService: UsersService;

  constructor() {
    this.usersService = new UsersService();
  }

  @Get()
  listUsers() {
    return this.usersService.findAll();
  }

  @Post()
  createUser(@Body() body: CreateUserDto) {
    return this.usersService.create(body);
  }

  @Get('/:id')
  async getUser(@Param('id', ParseUUIDPipe) id: string) {
    const user = await this.usersService.findOne(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  // @Put('/:id')
  // getUser() {}

  // @Delete('/:id')
  // getUser() {}
}
