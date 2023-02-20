import { Expose } from 'class-transformer';

export class ArtistDto {
  @Expose()
  id: string; // uuid v4

  @Expose()
  name: string;

  @Expose()
  grammy: boolean;
}
