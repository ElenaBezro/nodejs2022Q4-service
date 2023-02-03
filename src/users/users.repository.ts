// import { readFile, writeFile } from 'fs/promises';
import { v4 } from 'uuid';
import { CreateUserPayload, User } from './types';

export class UsersRepository {
  private users: Record<string, User> = {};

  async findOne(id: string) {
    const user = this.users[id];
    return user && { login: user.login };
    // for DB
    // const contents = await readFile('users.json', 'utf8');
    // const users = JSON.parse(contents);
    // return users[id];
  }
  async findAll() {
    const users = Object.values(this.users).map((user) => {
      const { password, ...otherFields } = user;
      return otherFields;
    });
    return users;
    // for DB
    // const contents = await readFile('users.json', 'utf8');
    // const users = JSON.parse(contents);
    // return users;
  }
  async create(user: CreateUserPayload) {
    const id = v4();
    const version = 0;
    const createdAt = Date.now();
    const updatedAt = createdAt;
    const newUser = { id, ...user, version, createdAt, updatedAt };
    this.users[id] = newUser;
    const { password, ...otherFields } = newUser;

    return { ...otherFields };
    // for DB
    // const contents = await readFile('users.json', 'utf8');
    // const users = JSON.parse(contents);
    // const id = uuid();
    // const version = 0;
    // const createdAt = Date.now();
    // const updatedAt = createdAt;
    // const newUser = { id, ...user, version, createdAt, updatedAt };
    // users[id] = newUser;
    // await writeFile('users.json', JSON.stringify(users));
    // return newUser;
  }
}
