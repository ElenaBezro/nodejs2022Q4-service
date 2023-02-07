import { Injectable, NotFoundException } from '@nestjs/common';
import { AlbumsService } from 'src/albums/albums.service';
import { ArtistsService } from 'src/artists/artists.service';
import { UpdateTrackDto } from './dtos/update-track.dto';
//import { ArtistsService } from 'src/artists/artists.service';
import { TracksRepository } from './tracks.repository';
import { Track } from './types';

@Injectable()
export class TracksService {
  // constructor(private artistsService: ArtistsService) {}
  constructor(
    public tracksRepo: TracksRepository,
    private artistService: ArtistsService,
    private albumService: AlbumsService,
  ) {}

  async findOne(id: string) {
    return await this.tracksRepo.findOne(id);
  }

  findAll() {
    return this.tracksRepo.findAll();
  }

  async create(track: Omit<Track, 'id'>) {
    const { artistId, albumId } = track;
    if (artistId) {
      const artist = await this.artistService.findOne(artistId);
      if (!artist) throw new NotFoundException('artistId invalid');
    }
    if (albumId) {
      const album = await this.albumService.findOne(albumId);
      if (!album) throw new NotFoundException('albumId invalid');
    }
    return this.tracksRepo.create(track);
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
    return this.tracksRepo.updateTrack(id, body);
  }

  deleteTrack(id: string) {
    return this.tracksRepo.deleteTrack(id);
  }
}
