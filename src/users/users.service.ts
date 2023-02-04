import { Injectable } from '@nestjs/common';
import { UpdatePasswordDto } from './dtos/update-password.dto';
import { CreateUserPayload } from './types';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(public usersRepo: UsersRepository) {}

  async findOne(id: string) {
    return await this.usersRepo.findOne(id);
  }
  findAll() {
    return this.usersRepo.findAll();
  }
  create(user: CreateUserPayload) {
    return this.usersRepo.create(user);
  }
  updatePassword(id: string, passwords: UpdatePasswordDto) {
    return this.usersRepo.updatePassword(id, passwords);
  }
  deleteUser(id: string) {
    return this.usersRepo.deleteUser(id);
  }
}
