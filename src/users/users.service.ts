import { CreateUserPayload } from './types';
import { UsersRepository } from './users.repository';

export class UsersService {
  usersRepo: UsersRepository;

  constructor() {
    this.usersRepo = new UsersRepository();
  }

  async findOne(id: string) {
    return await this.usersRepo.findOne(id);
  }
  findAll() {
    return this.usersRepo.findAll();
  }
  create(user: CreateUserPayload) {
    return this.usersRepo.create(user);
  }
}
