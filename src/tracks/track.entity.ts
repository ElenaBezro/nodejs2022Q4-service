import { Min } from 'class-validator';
import { Album } from 'src/albums/album.entity';
import { Artist } from 'src/artists/artist.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Track {
  @PrimaryGeneratedColumn('uuid')
  id: string; // uuid v4

  @Column()
  name: string;

  @Column()
  @Min(1)
  duration: number; // integer number}

  @ManyToOne(() => Artist, (artist) => artist.tracks, { nullable: true })
  artist?: Artist;

  @ManyToOne(() => Album, (album) => album.tracks, { nullable: true })
  album?: Album;
}
