// import { readFile, writeFile } from 'fs/promises';
import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';
import { UpdateAlbumDto } from './dtos/update-album.dto';
import { Album } from './types';

@Injectable()
export class AlbumsRepository {
  private albums: Record<string, Album> = {};

  async findOne(albumId: string) {
    const album = this.albums[albumId];
    return album;
  }
  async findAll() {
    const albums = Object.values(this.albums);
    return albums;
  }
  async create(album: Omit<Album, 'id'>) {
    const id = v4();
    const { name, artistId, year } = album;
    const newAlbum = { id, name, artistId, year };
    this.albums[id] = newAlbum;
    return newAlbum;
  }

  async updateAlbum(id: string, albumDto: UpdateAlbumDto) {
    const album = this.albums[id];
    const { name, artistId, year } = albumDto;
    const updatedAlbum = { ...album, name, artistId, year };
    this.albums[id] = updatedAlbum;
    return updatedAlbum;
  }

  async deleteAlbum(id: string) {
    const album = this.albums[id];
    return album && delete this.albums[id];
  }
}
