import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FavoritesService } from '../favorites/favorites.service';
import { TracksService } from '../tracks/tracks.service';
import { Repository } from 'typeorm';
import { Artist } from './artist.entity';
import { CreateArtistDto } from './dtos/create-artist.dto';
import { UpdateArtistDto } from './dtos/update-artist.dto';
import { AlbumsService } from 'src/albums/albums.service';

@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(Artist) private artistsRepo: Repository<Artist>,
    @Inject(forwardRef(() => TracksService)) private trackService: TracksService,
    @Inject(forwardRef(() => AlbumsService)) private albumsService: AlbumsService,
    @Inject(forwardRef(() => FavoritesService)) private favoritesService: FavoritesService,
  ) {}

  findOne(id: string) {
    return this.artistsRepo.findOneBy({ id });
  }

  findAll() {
    return this.artistsRepo.find();
  }

  create(artist: CreateArtistDto) {
    const newArtist = this.artistsRepo.create(artist);
    return this.artistsRepo.save(newArtist);
  }

  async updateArtist(id: string, payload: UpdateArtistDto) {
    const artist = await this.findOne(id);

    if (!artist) {
      throw new NotFoundException('Artist not found');
    }

    return this.artistsRepo.save({ id, ...payload });
  }

  async deleteArtist(id: string) {
    const artist = await this.findOne(id);

    if (!artist) {
      throw new NotFoundException('Artist not found');
    }

    // delete artistId from tracks fields
    const tracks = await this.trackService.findByArtistId(id);
    for (const track of tracks) {
      await this.trackService.updateTrack(track.id, {
        ...track,
        albumId: track.album?.id ?? null,
        artistId: null,
      });
    }

    // delete artistId from albums
    const albums = await this.albumsService.findByArtistId(id);
    for (const album of albums) {
      await this.albumsService.updateAlbum(album.id, {
        ...album,
        artistId: null,
      });
    }

    // delete artistId from favorites
    const favoriteArtist = await this.favoritesService.findArtist(id);
    if (favoriteArtist) {
      await this.favoritesService.deleteArtist(id);
    }

    return this.artistsRepo.remove(artist);
  }
}
