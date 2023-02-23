import { Album } from 'src/albums/album.entity';
import { Artist } from 'src/artists/artist.entity';
import { Track } from 'src/tracks/track.entity';
import { Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';

@Entity('favorite')
export class Favorites {
  @PrimaryGeneratedColumn('uuid')
  id: string; // uuid v4

  @ManyToMany(() => Artist, (artist) => artist.id)
  @JoinTable({ name: 'favorite_artists' })
  artists: Artist[];

  @ManyToMany(() => Album, (album) => album.id)
  @JoinTable({ name: 'favorite_albums' })
  albums: Album[];

  @ManyToMany(() => Track, (track) => track.id)
  @JoinTable({ name: 'favorite_tracks' })
  tracks: Track[];
}
