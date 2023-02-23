import { Min } from 'class-validator';
import { Artist } from 'src/artists/artist.entity';
import { Track } from 'src/tracks/track.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';

@Entity()
export class Album {
  @PrimaryGeneratedColumn('uuid')
  id: string; // uuid v4

  @Column()
  name: string;

  @Column()
  @Min(1800)
  year: number;

  @ManyToOne(() => Artist, (artist) => artist.albums, { nullable: true })
  artist?: Artist;

  @OneToMany(() => Track, (track) => track.album)
  tracks: Track[];
}
