import { Injectable } from '@nestjs/common';
import { AlbumsRepository } from './albums.repository';
import { UpdateAlbumDto } from './dtos/update-album.dto';
import { Album } from './types';

@Injectable()
export class AlbumsService {
  constructor(public albumsRepo: AlbumsRepository) {}

  async findOne(id: string) {
    return await this.albumsRepo.findOne(id);
  }
  findAll() {
    return this.albumsRepo.findAll();
  }
  create(track: Omit<Album, 'id'>) {
    return this.albumsRepo.create(track);
  }
  updateAlbum(id: string, body: UpdateAlbumDto) {
    return this.albumsRepo.updateAlbum(id, body);
  }
  deleteAlbum(id: string) {
    return this.albumsRepo.deleteAlbum(id);
  }
}
