import { Injectable } from '@nestjs/common';
import { FavoritesRepository } from './favorites.repository';
import { AlbumsService } from 'src/albums/albums.service';
import { ArtistsService } from 'src/artists/artists.service';
import { TracksService } from 'src/tracks/tracks.service';

@Injectable()
export class FavoritesService {
  constructor(
    private favoritesRepo: FavoritesRepository,
    private artistsService: ArtistsService,
    private albumsService: AlbumsService,
    private tracksService: TracksService,
  ) {}

  async findTrack(id: string) {
    return await this.favoritesRepo.findTrack(id);
  }

  async findArtist(id: string) {
    return await this.favoritesRepo.findArtist(id);
  }
  async findAlbum(id: string) {
    return await this.favoritesRepo.findAlbum(id);
  }

  async findAll() {
    const favoritesIds = await this.favoritesRepo.findAll();
    const favoritesResponse = {};
    for (const [key, arrayOfIds] of Object.entries(favoritesIds)) {
      // const serviceTypesByKey = {
      //   artists: 'artistsService',
      //   albums: 'albumsService',
      //   tracks: 'tracksService',
      // };
      const arrayOfEntities = await Promise.all(
        arrayOfIds.map(async (id: string) => {
          switch (key) {
            case 'artists':
              return await this.artistsService.findOne(id);
              break;
            case 'albums':
              return await this.albumsService.findOne(id);
              break;
            case 'tracks':
              return await this.tracksService.findOne(id);
              break;
          }
        }),
      );
      favoritesResponse[key] = arrayOfEntities;
    }
    return favoritesResponse;
  }
  async addTrack(trackId: string) {
    return this.favoritesRepo.addTrack(trackId);
  }

  async addArtist(artistId: string) {
    return this.favoritesRepo.addArtist(artistId);
  }

  async addAlbum(albumId: string) {
    return this.favoritesRepo.addAlbum(albumId);
  }

  deleteTrack(id: string) {
    return this.favoritesRepo.deleteTrack(id);
  }

  deleteArtist(id: string) {
    return this.favoritesRepo.deleteArtist(id);
  }
  deleteAlbum(id: string) {
    return this.favoritesRepo.deleteAlbum(id);
  }
}
