import { Expose } from 'class-transformer';

export class UserDto {
  @Expose()
  id: string; // uuid v4

  @Expose()
  name: string;

  @Expose()
  grammy: boolean;
}
