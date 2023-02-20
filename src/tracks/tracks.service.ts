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

  findOne(id: string) {
    return this.tracksRepo.findOneBy({ id });
  }

  findByArtistId(artistId: string) {
    return this.tracksRepo.find({ where: { artist: { id: artistId } }, relations: { album: true, artist: true } });
  }

  findByAlbumId(albumId: string) {
    return this.tracksRepo.find({ where: { album: { id: albumId } }, relations: { album: true, artist: true } });
  }

  findAll() {
    return this.tracksRepo.find();
  }

  async create(track: CreateTrackDto) {
    const { artistId, albumId } = track;
    const newTrack = this.tracksRepo.create(track);

    if (artistId) {
      newTrack.artist = await this.artistService.findOne(artistId);
      if (!newTrack.artist) throw new NotFoundException('artistId invalid');
    }

    if (albumId) {
      newTrack.album = await this.albumService.findOne(albumId);
      if (!newTrack.album) throw new NotFoundException('albumId invalid');
    }

    return this.tracksRepo.manager.save(newTrack);
  }

  async updateTrack(id: string, body: UpdateTrackDto) {
    const { artistId, albumId, duration, name } = body;

    const track: Track = { id, duration, name };

    if (artistId) {
      track.artist = await this.artistService.findOne(artistId);
      if (!track.artist) throw new NotFoundException('artistId invalid');
    } else if (artistId === null) {
      track.artist = null;
    }

    if (albumId) {
      track.album = await this.albumService.findOne(albumId);
      if (!track.album) throw new NotFoundException('albumId invalid');
    } else if (albumId === null) {
      track.album = null;
    }

    return this.tracksRepo.save(track);
  }

  async deleteTrack(id: string) {
    const track = await this.findOne(id);

    if (!track) {
      throw new NotFoundException('Track not found');
    }

    // delete trackId from favorites
    const favoriteTrack = await this.favoritesService.findTrack(id);
    if (favoriteTrack) {
      await this.favoritesService.deleteTrack(id);
    }

    return this.tracksRepo.remove(track);
  }
}
