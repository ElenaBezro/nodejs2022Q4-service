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
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdatePasswordDto } from './dtos/update-password.dto';
import { UsersService } from './users.service';

@Controller('user')
export class UsersController {
  constructor(public usersService: UsersService) {}

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

  @Put('/:id')
  async updatePassword(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdatePasswordDto,
  ) {
    const user = await this.usersService.findOne(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const userWithNewPassword = await this.usersService.updatePassword(
      id,
      body,
    );
    if (!userWithNewPassword) {
      throw new ForbiddenException('Wrong password');
    }

    return userWithNewPassword;
  }

  @Delete('/:id')
  @HttpCode(204)
  async deleteUser(@Param('id', ParseUUIDPipe) id: string) {
    const user = await this.usersService.findOne(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.usersService.deleteUser(id);
  }
}
