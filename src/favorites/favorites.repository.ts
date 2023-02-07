// import { readFile, writeFile } from 'fs/promises';
import { Injectable } from '@nestjs/common';
// import { v4 } from 'uuid';
import { Favorites } from './types';

@Injectable()
export class FavoritesRepository {
  private favorites: Favorites = { artists: [], albums: [], tracks: [] };

  async findTrack(id: string) {
    const isFavorite = this.favorites.tracks.includes(id);
    return isFavorite;
  }

  async findArtist(id: string) {
    const isFavorite = this.favorites.artists.includes(id);
    return isFavorite;
  }
  async findAlbum(id: string) {
    const isFavorite = this.favorites.albums.includes(id);
    return isFavorite;
  }

  async findAll() {
    return this.favorites;
  }

  async addTrack(trackId: string) {
    const isFavorite = this.favorites.tracks.find((track) => track === trackId);
    !isFavorite && this.favorites.tracks.push(trackId);
  }

  async addArtist(artistId: string) {
    const isFavorite = this.favorites.artists.find(
      (artist) => artist === artistId,
    );
    !isFavorite && this.favorites.artists.push(artistId);
  }

  async addAlbum(albumId: string) {
    const isFavorite = this.favorites.albums.find((album) => album === albumId);
    !isFavorite && this.favorites.albums.push(albumId);
  }

  async deleteTrack(id: string) {
    if (this.favorites.tracks.includes(id)) {
      this.favorites.tracks = this.favorites.tracks.filter(
        (trackId) => trackId !== id,
      );
    }
  }

  async deleteArtist(id: string) {
    if (this.favorites.artists.includes(id)) {
      this.favorites.artists = this.favorites.artists.filter(
        (artistId) => artistId !== id,
      );
    }
  }

  async deleteAlbum(id: string) {
    if (this.favorites.albums.includes(id)) {
      this.favorites.albums = this.favorites.albums.filter(
        (albumId) => albumId !== id,
      );
    }
  }
}
