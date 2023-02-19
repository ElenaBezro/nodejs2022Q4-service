import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FavoritesService } from '../favorites/favorites.service';
import { Favorites } from '../favorites/types';
import { TracksService } from '../tracks/tracks.service';
import { Repository } from 'typeorm';
import { Artist } from './artist.entity';
import { CreateArtistDto } from './dtos/create-artist.dto';
import { UpdateArtistDto } from './dtos/update-artist.dto';

@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(Artist) private artistsRepo: Repository<Artist>,
    @Inject(forwardRef(() => FavoritesService)) private trackService: TracksService,
    @Inject(forwardRef(() => FavoritesService)) private favoritesService: FavoritesService,
  ) {}

  async findOne(id: string) {
    const artist = await this.artistsRepo.findOneBy({ id });

    if (!artist) {
      throw new NotFoundException('Artist not found');
    }

    return artist;
  }

  findAll() {
    return this.artistsRepo.find();
  }

  create(artist: CreateArtistDto) {
    const newArtist = this.artistsRepo.create(artist);
    return this.artistsRepo.save(newArtist);
  }

  async updateArtist(id: string, artist: UpdateArtistDto) {
    await this.findOne(id);
    return this.artistsRepo.save({ id, ...artist });
  }

  async deleteArtist(id: string) {
    const artist = await this.findOne(id);

    // delete artistId from tracks fields
    const tracks = await this.trackService.findByArtistId(id);
    for (const track of tracks) {
      await this.trackService.updateTrack(track.id, {
        ...track,
        artistId: null,
      });
    }

    // delete artistId from favorites
    const favorites: Favorites = await this.favoritesService.findAllIds();
    if (favorites.artists.includes(id)) {
      await this.favoritesService.deleteArtist(id);
    }

    return this.artistsRepo.remove(artist);
  }
}
