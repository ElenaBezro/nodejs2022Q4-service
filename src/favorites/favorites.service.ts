import { Injectable } from '@nestjs/common';
import { FavoritesRepository } from './favorites.repository';
//import { Track } from './types';

@Injectable()
export class FavoritesService {
  constructor(private favoritesRepo: FavoritesRepository) {}

  // async findOne(id: string) {
  //   return await this.favoritesRepo.findOne(id);
  // }
  async findAll() {
    return this.favoritesRepo.findAll();
  }
  addTrack(trackId: string) {
    return this.favoritesRepo.addTrack(trackId);
  }

  deleteTrack(id: string) {
    return this.favoritesRepo.deleteTrack(id);
  }
}
