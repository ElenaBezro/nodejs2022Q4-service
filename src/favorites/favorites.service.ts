import { forwardRef, Inject, Injectable } from '@nestjs/common';

import { AlbumsService } from '../albums/albums.service';
import { ArtistsService } from '../artists/artists.service';
import { TracksService } from '../tracks/tracks.service';

import { FavoritesRepository } from './favorites.repository';
import { FavoritesResponse } from './types';

@Injectable()
export class FavoritesService {
  constructor(
    private favoritesRepo: FavoritesRepository,
    @Inject(forwardRef(() => ArtistsService)) private artistsService: ArtistsService,
    @Inject(forwardRef(() => AlbumsService)) private albumsService: AlbumsService,
    @Inject(forwardRef(() => TracksService)) private tracksService: TracksService,
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

  async findAllIds() {
    return await this.favoritesRepo.findAll();
  }

  async findAll() {
    const favorites = await this.favoritesRepo.findAll();
    const favoritesResponse: FavoritesResponse = {
      artists: [],
      albums: [],
      tracks: [],
    };

    favoritesResponse.albums = await Promise.all(
      favorites.albums.map((albumId) => this.albumsService.findOne(albumId)),
    );

    favoritesResponse.artists = await Promise.all(
      favorites.artists.map((artistId) => this.artistsService.findOne(artistId)),
    );

    favoritesResponse.tracks = await Promise.all(
      favorites.tracks.map((trackId) => this.tracksService.findOne(trackId)),
    );

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

  async deleteTrack(id: string) {
    await this.favoritesRepo.deleteTrack(id);
  }

  async deleteArtist(id: string) {
    await this.favoritesRepo.deleteArtist(id);
  }
  async deleteAlbum(id: string) {
    await this.favoritesRepo.deleteAlbum(id);
  }
}
