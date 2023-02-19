import { Expose } from 'class-transformer';

export class UserDto {
  @Expose()
  id: string; // uuid v4

  @Expose()
  year: number;

  @Expose()
  name: string;

  @Expose()
  artistId: string | null;
}
