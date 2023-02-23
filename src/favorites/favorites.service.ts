import { forwardRef, Inject, Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AlbumsService } from '../albums/albums.service';
import { ArtistsService } from '../artists/artists.service';
import { TracksService } from '../tracks/tracks.service';
import { Favorites } from './favorites.entity';

@Injectable()
export class FavoritesService {
  constructor(
    @Inject(forwardRef(() => ArtistsService)) private artistsService: ArtistsService,
    @Inject(forwardRef(() => AlbumsService)) private albumsService: AlbumsService,
    @Inject(forwardRef(() => TracksService)) private tracksService: TracksService,
    @InjectRepository(Favorites) private favoritesRepo: Repository<Favorites>,
  ) {}

  async findTrack(id: string) {
    const favorites = await this.addFavoriteIfNotExists();
    return favorites.tracks.find((track) => track.id === id);
  }

  async findArtist(id: string) {
    const favorites = await this.addFavoriteIfNotExists();
    return favorites.artists.find((artist) => artist.id === id);
  }

  async findAlbum(id: string) {
    const favorites = await this.addFavoriteIfNotExists();
    return favorites.albums.find((album) => album.id === id);
  }

  // async findAllIds() {
  //   return await this.favoritesRepo.find();
  // }

  async findAll() {
    const favorites = await this.favoritesRepo.find({
      relations: {
        albums: {
          artist: true,
        },
        tracks: {
          album: true,
          artist: true,
        },
        artists: true,
      },
    });

    return favorites[0] ?? ({ albums: [], artists: [], tracks: [] } as Favorites);
  }

  // TODO: delete once users are added
  async addFavoriteIfNotExists() {
    const favorite = await this.favoritesRepo.find({
      take: 1,
      relations: {
        albums: {
          artist: true,
        },
        tracks: {
          album: true,
          artist: true,
        },
        artists: true,
      },
    });

    if (favorite.length) {
      return favorite[0];
    }
    const newFavorites = new Favorites();
    newFavorites.tracks = [];
    newFavorites.artists = [];
    newFavorites.albums = [];
    return this.favoritesRepo.save(newFavorites);
  }

  async addTrack(id: string) {
    const track = await this.tracksService.findOne(id);
    if (!track) throw new UnprocessableEntityException('Track not found');

    const favorites = await this.addFavoriteIfNotExists();
    if (!favorites.tracks.some((other) => other.id === track.id)) {
      favorites.tracks.push(track);
      await this.favoritesRepo.manager.save(favorites);
      return true;
    }
    return false;
  }

  async addArtist(id: string) {
    const artist = await this.artistsService.findOne(id);
    if (!artist) throw new UnprocessableEntityException('Artist not found');

    const favorites = await this.addFavoriteIfNotExists();
    if (!favorites.artists.some((other) => other.id === artist.id)) {
      favorites.artists.push(artist);
      await this.favoritesRepo.manager.save(favorites);
      return true;
    }
    return false;
  }

  async addAlbum(id: string) {
    const album = await this.albumsService.findOne(id);
    if (!album) throw new UnprocessableEntityException('Album not found');

    const favorites = await this.addFavoriteIfNotExists();
    if (!favorites.albums.some((other) => other.id === album.id)) {
      favorites.albums.push(album);
      await this.favoritesRepo.manager.save(favorites);
      return true;
    }
    return false;
  }

  async deleteTrack(id: string) {
    const favorites = await this.favoritesRepo.find({ where: { tracks: { id } }, relations: { tracks: true } });

    if (!favorites.length) {
      // TODO: double check
      throw new NotFoundException('Is not in favorites');
    }

    for (const favorite of favorites) {
      favorite.tracks = favorite.tracks.filter((track) => track.id !== id);
      await this.favoritesRepo.manager.save(favorite);
    }
  }

  async deleteArtist(id: string) {
    const favorites = await this.favoritesRepo.find({ where: { artists: { id } }, relations: { artists: true } });

    if (!favorites.length) {
      // TODO: double check
      throw new NotFoundException('Is not in favorites');
    }

    for (const favorite of favorites) {
      favorite.artists = favorite.artists.filter((artist) => artist.id !== id);
      await this.favoritesRepo.manager.save(favorite);
    }
  }

  async deleteAlbum(id: string) {
    const favorites = await this.favoritesRepo.find({ where: { albums: { id } }, relations: { albums: true } });

    if (!favorites.length) {
      // TODO: double check
      throw new NotFoundException('Is not in favorites');
    }

    for (const favorite of favorites) {
      favorite.albums = favorite.albums.filter((album) => album.id !== id);
      await this.favoritesRepo.manager.save(favorite);
    }
  }
}
