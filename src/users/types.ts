// TODO: delete and use DTOs instead
interface User {
  id: string; // uuid v4
  login: string;
  password: string;
  version: number; // integer number, increments on update
  createdAt: number; // timestamp of creation
  updatedAt: number; // timestamp of last update
}

type CreateUserPayload = {
  login: string;
  password: string;
};

export { User, CreateUserPayload };
