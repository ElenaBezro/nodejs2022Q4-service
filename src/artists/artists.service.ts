import { Injectable } from '@nestjs/common';
import { ArtistsRepository } from './artists.repository';
import { CreateArtistDto } from './dtos/create-artist.dto';
import { UpdateArtistDto } from './dtos/update-artist.dto';

@Injectable()
export class ArtistsService {
  constructor(private artistsRepo: ArtistsRepository) {}

  async findOne(id: string) {
    return await this.artistsRepo.findOne(id);
  }
  findAll() {
    return this.artistsRepo.findAll();
  }
  create(artist: CreateArtistDto) {
    return this.artistsRepo.create(artist);
  }
  updateArtist(id: string, artist: UpdateArtistDto) {
    return this.artistsRepo.updateArtist(id, artist);
  }
  deleteArtist(id: string) {
    return this.artistsRepo.deleteArtist(id);
  }
}
