import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { UpdatePasswordDto } from './dtos/update-password.dto';
import { CreateUserPayload } from './types';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private usersRepo: Repository<User>) {}

  async findOne(id: string) {
    const user = await this.usersRepo.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  findAll() {
    return this.usersRepo.find();
  }

  create(user: CreateUserPayload) {
    const now = Date.now();

    const newUser = this.usersRepo.create({
      ...user,
      createdAt: now,
      updatedAt: now,
    });

    return this.usersRepo.save(newUser);
  }

  async updatePassword(id: string, passwords: UpdatePasswordDto) {
    const user = await this.findOne(id);

    if (user.password !== passwords.oldPassword) {
      throw new ForbiddenException('Wrong password');
    }

    let { version, updatedAt } = user;
    version = version + 1;
    updatedAt = Date.now();
    Object.assign(user, {
      password: passwords.newPassword,
      version,
      updatedAt,
    });

    return this.usersRepo.save(user);
  }
  // async update(id: string, attrs: Partial<User>) {
  // const user = await this.findOne(id);
  //   if (!user) {
  //     throw new NotFoundException('User not found');
  //   }
  //   Object.assign(user,attrs);
  //   return this.usersRepo.save(user);
  //   return this.usersRepo.updatePassword(id, passwords);
  // }
  async deleteUser(id: string) {
    const user = await this.findOne(id);

    return this.usersRepo.remove(user);
  }
}
