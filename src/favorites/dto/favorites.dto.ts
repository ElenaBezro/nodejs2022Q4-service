import { Expose, Transform } from 'class-transformer';
import { AlbumDto } from 'src/albums/dtos/album.dto';
import { ArtistDto } from 'src/artists/dtos/artist.dto';
import { TrackDto } from 'src/tracks/dtos/track.dto';
import { Favorites } from '../favorites.entity';

export class FavoritesDto {
  @Expose()
  @Transform(({ obj }) =>
    (obj as Favorites).artists.map<ArtistDto>((artist) => ({
      id: artist.id,
      name: artist.name,
      grammy: artist.grammy,
    })),
  )
  artists: ArtistDto[];

  @Expose()
  @Transform(({ obj }) =>
    (obj as Favorites).albums.map<AlbumDto>((album) => ({
      id: album.id,
      name: album.name,
      year: album.year,
      artistId: album.artist?.id ?? null,
    })),
  )
  albums: AlbumDto[];

  @Expose()
  @Transform(({ obj }) =>
    (obj as Favorites).tracks.map<TrackDto>((track) => ({
      id: track.id,
      name: track.name,
      duration: track.duration,
      albumId: track.album?.id ?? null,
      artistId: track.artist?.id ?? null,
    })),
  )
  tracks: TrackDto[];
}
