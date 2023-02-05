// import { readFile, writeFile } from 'fs/promises';
import { Injectable } from '@nestjs/common';
// import { v4 } from 'uuid';
import { Favorites } from './types';

@Injectable()
export class FavoritesRepository {
  private favorites: Favorites = { artists: [], albums: [], tracks: [] };

  // async findOne(trackId: string) {
  //   const track = this.tracks[trackId];
  //   return track;
  // }
  async findAll() {
    return this.favorites;
  }
  async addTrack(trackId: string) {
    this.favorites.tracks.push(trackId);
  }

  async deleteTrack(id: string) {
    const isFavorite = this.favorites.tracks.includes(id);
    return (
      !isFavorite && this.favorites.tracks.filter((trackId) => trackId !== id)
    );
  }
}
