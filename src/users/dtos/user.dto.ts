import { Expose, Type } from 'class-transformer';

export class UserDto {
  @Expose()
  id: string;

  @Expose()
  login: string;

  @Expose()
  @Type(() => Number)
  createdAt: number;

  @Expose()
  @Type(() => Number)
  updatedAt: number;

  @Expose()
  version: number;
}
