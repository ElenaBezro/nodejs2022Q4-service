import { Injectable, NotFoundException } from '@nestjs/common';
import { ArtistsService } from 'src/artists/artists.service';
import { AlbumsRepository } from './albums.repository';
import { UpdateAlbumDto } from './dtos/update-album.dto';
import { Album } from './types';

@Injectable()
export class AlbumsService {
  constructor(
    public albumsRepo: AlbumsRepository,
    private artistService: ArtistsService,
  ) {}

  async findOne(id: string) {
    return await this.albumsRepo.findOne(id);
  }

  findAll() {
    return this.albumsRepo.findAll();
  }
  async create(album: Omit<Album, 'id'>) {
    const { artistId } = album;
    if (artistId) {
      const artist = await this.artistService.findOne(artistId);
      if (!artist) throw new NotFoundException('artistId invalid');
    }
    return this.albumsRepo.create(album);
  }

  async updateAlbum(id: string, body: UpdateAlbumDto) {
    const { artistId } = body;
    if (artistId) {
      const artist = await this.artistService.findOne(artistId);
      if (!artist) throw new NotFoundException('artistId invalid');
    }
    return this.albumsRepo.updateAlbum(id, body);
  }

  deleteAlbum(id: string) {
    return this.albumsRepo.deleteAlbum(id);
  }
}
