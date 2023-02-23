import { Expose, Transform } from 'class-transformer';
import { Track } from '../track.entity';

export class TrackDto {
  @Expose()
  id: string; // uuid v4

  @Expose()
  name: string;

  @Expose()
  @Transform(({ obj }) => (obj as Track).artist?.id ?? null)
  artistId: string | null; // refers to Artist

  @Expose()
  @Transform(({ obj }) => (obj as Track).album?.id ?? null)
  albumId: string | null; // refers to Album

  @Expose()
  duration: number; // integer number
}
