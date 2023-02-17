import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  NotFoundException,
  ParseUUIDPipe,
  Put,
  Delete,
  HttpCode,
  ForbiddenException,
} from '@nestjs/common';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdatePasswordDto } from './dtos/update-password.dto';
import { UserDto } from './dtos/user.dto';
import { UsersService } from './users.service';

@Controller('user')
@Serialize(UserDto)
export class UsersController {
  constructor(private usersService: UsersService) {}

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
    return await this.usersService.findOne(id);
  }

  @Put('/:id')
  async updatePassword(@Param('id', ParseUUIDPipe) id: string, @Body() body: UpdatePasswordDto) {
    return await this.usersService.updatePassword(id, body);
  }

  @Delete('/:id')
  @HttpCode(204)
  async deleteUser(@Param('id', ParseUUIDPipe) id: string) {
    await this.usersService.deleteUser(id);
  }
}
