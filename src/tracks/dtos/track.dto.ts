import { Expose } from 'class-transformer';

export class UserDto {
  @Expose()
  id: string; // uuid v4

  @Expose()
  name: string;

  @Expose()
  artistId: string | null; // refers to Artist

  @Expose()
  albumId: string | null; // refers to Album

  @Expose()
  duration: number; // integer number
}
