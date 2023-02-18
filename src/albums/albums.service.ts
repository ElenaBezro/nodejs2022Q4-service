import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArtistsService } from '../artists/artists.service';
import { UpdateAlbumDto } from './dtos/update-album.dto';
import { Album } from './album.entity';
import { Repository } from 'typeorm';
import { TracksService } from '../tracks/tracks.service';
import { FavoritesService } from '../favorites/favorites.service';

@Injectable()
export class AlbumsService {
  constructor(
    @InjectRepository(Album) public albumsRepo: Repository<Album>,
    private artistService: ArtistsService,
    @Inject(forwardRef(() => TracksService)) private trackService: TracksService,
    @Inject(forwardRef(() => FavoritesService)) private favoritesService: FavoritesService,
  ) {}

  async findOne(id: string) {
    const album = await this.albumsRepo.findOneBy({ id });
    if (!album) {
      throw new NotFoundException('Album not found');
    }
    return album;
  }

  findAll() {
    return this.albumsRepo.find();
  }

  async create(album: Omit<Album, 'id'>) {
    const { artistId } = album;
    if (artistId) {
      const artist = await this.artistService.findOne(artistId);
      // const artist = await this.artistService.findOneBy({artistId});
      if (!artist) throw new NotFoundException('artistId invalid');
    }
    const newAlbum = this.albumsRepo.create(album);

    return this.albumsRepo.save(newAlbum);
  }

  async updateAlbum(id: string, body: UpdateAlbumDto) {
    const album = await this.findOne(id);

    if (!album) {
      throw new NotFoundException('Album not found');
    }

    const { artistId } = body;
    if (artistId) {
      const artist = await this.artistService.findOne(artistId);
      if (!artist) throw new NotFoundException('artistId invalid');
    }

    return this.albumsRepo.save(album);
  }

  async deleteAlbum(id: string) {
    const album = await this.findOne(id);

    // delete albumId from tracks fields
    const tracks = await this.trackService.findAll();
    for (const track of tracks) {
      if (track.albumId === id) {
        await this.trackService.updateTrack(track.id, {
          ...track,
          albumId: null,
        });
      }
    }

    // delete albumId from favorites
    const favorites = await this.favoritesService.findAllIds();
    if (favorites.albums.includes(id)) {
      await this.favoritesService.deleteAlbum(id);
    }

    return this.albumsRepo.remove(album);
  }
}
