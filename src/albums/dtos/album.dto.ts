import { Expose, Transform } from 'class-transformer';
import { Album } from '../album.entity';

export class AlbumDto {
  @Expose()
  id: string; // uuid v4

  @Expose()
  year: number;

  @Expose()
  name: string;

  @Transform(({ obj }) => (obj as Album).artist?.id ?? null)
  @Expose()
  artistId: string | null;
}
