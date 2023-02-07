// import { readFile, writeFile } from 'fs/promises';
import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';
import { UpdateArtistDto } from './dtos/update-artist.dto';
import { Artist } from './types';

@Injectable()
export class ArtistsRepository {
  private artists: Record<string, Artist> = {};

  async findOne(artistId: string) {
    const artist = this.artists[artistId];
    return artist;
  }
  async findAll() {
    const artists = Object.values(this.artists);
    return artists;
  }
  async create(artist: Omit<Artist, 'id'>) {
    const id = v4();
    const { name, grammy } = artist;
    const newArtist = { id, name, grammy };
    this.artists[id] = newArtist;
    return newArtist;
  }

  async updateArtist(id: string, artistDto: UpdateArtistDto) {
    const artist = this.artists[id];
    const { name, grammy } = artistDto;
    const updatedArtist = { ...artist, name, grammy };
    this.artists[id] = updatedArtist;
    return updatedArtist;
  }

  async deleteArtist(id: string) {
    const artist = this.artists[id];
    return artist && delete this.artists[id];
  }
}
