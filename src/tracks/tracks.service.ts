import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FavoritesService } from '../favorites/favorites.service';
import { Repository } from 'typeorm';
import { AlbumsService } from '../albums/albums.service';
import { ArtistsService } from '../artists/artists.service';
import { CreateTrackDto } from './dtos/create-track.dto';
import { UpdateTrackDto } from './dtos/update-track.dto';
import { Track } from './track.entity';

@Injectable()
export class TracksService {
  constructor(
    @InjectRepository(Track) public tracksRepo: Repository<Track>,
    @Inject(forwardRef(() => FavoritesService)) private favoritesService: FavoritesService,
    @Inject(forwardRef(() => ArtistsService)) private artistService: ArtistsService,
    @Inject(forwardRef(() => AlbumsService)) private albumService: AlbumsService,
  ) {}

  async findOne(id: string) {
    const track = await this.tracksRepo.findOneBy({ id });

    if (!track) {
      throw new NotFoundException('Track not found');
    }

    return track;
  }

  findByArtistId(artistId: string) {
    return this.tracksRepo.find({ where: { artistId } });
  }

  findAll() {
    return this.tracksRepo.find();
  }

  async create(track: CreateTrackDto) {
    const { artistId, albumId } = track;
    if (artistId) {
      const artist = await this.artistService.findOne(artistId);
      if (!artist) throw new NotFoundException('artistId invalid');
    }
    if (albumId) {
      const album = await this.albumService.findOne(albumId);
      if (!album) throw new NotFoundException('albumId invalid');
    }
    const newTrack = this.tracksRepo.create(track);
    return this.tracksRepo.save(newTrack);
  }

  async updateTrack(id: string, body: UpdateTrackDto) {
    const { artistId, albumId } = body;
    if (artistId) {
      const artist = await this.artistService.findOne(artistId);
      if (!artist) throw new NotFoundException('artistId invalid');
    }
    if (albumId) {
      const album = await this.albumService.findOne(albumId);
      if (!album) throw new NotFoundException('albumId invalid');
    }
    return this.tracksRepo.save({ id, ...body });
  }

  async deleteTrack(id: string) {
    const track = await this.findOne(id);

    // delete trackId from favorites
    const favorites = await this.favoritesService.findAllIds();
    if (favorites.tracks.includes(id)) {
      await this.favoritesService.deleteTrack(id);
    }

    return this.tracksRepo.remove(track);
  }
}
