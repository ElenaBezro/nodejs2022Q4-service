import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArtistsService } from '../artists/artists.service';
import { UpdateAlbumDto } from './dtos/update-album.dto';
import { Album } from './album.entity';
import { Repository } from 'typeorm';
import { TracksService } from '../tracks/tracks.service';
import { Artist } from '../artists/artist.entity';
import { FavoritesService } from '../favorites/favorites.service';
import { CreateAlbumDto } from './dtos/create-album.dto';

@Injectable()
export class AlbumsService {
  constructor(
    @InjectRepository(Album) public albumsRepo: Repository<Album>,
    @Inject(forwardRef(() => ArtistsService)) private artistService: ArtistsService,
    @Inject(forwardRef(() => TracksService)) private trackService: TracksService,
    @Inject(forwardRef(() => FavoritesService)) private favoritesService: FavoritesService,
  ) {}

  findOne(id: string): Promise<Album | null> {
    return this.albumsRepo.findOneBy({ id });
  }

  findAll() {
    return this.albumsRepo.find();
  }

  findByArtistId(artistId: string) {
    return this.albumsRepo.find({ where: { artist: { id: artistId } } });
  }

  async create(album: CreateAlbumDto) {
    let artist: Artist | undefined;
    if (album.artistId) {
      artist = await this.artistService.findOne(album.artistId);
      if (!artist) throw new NotFoundException('artistId invalid');
    }
    const newAlbum = this.albumsRepo.create({ ...album, artist });

    return this.albumsRepo.save(newAlbum);
  }

  async updateAlbum(id: string, body: UpdateAlbumDto) {
    const album = await this.findOne(id);

    if (!album) {
      throw new NotFoundException('Album not found');
    }

    Object.assign(album, body);

    const { artistId } = body;
    if (artistId) {
      album.artist = await this.artistService.findOne(artistId);
      if (!album.artist) throw new NotFoundException('artistId invalid');
    } else if (artistId === null) {
      album.artist = null;
    }

    return this.albumsRepo.save(album);
  }

  async deleteAlbum(id: string) {
    const album = await this.findOne(id);

    if (!album) {
      throw new NotFoundException('Album not found');
    }

    // delete albumId from tracks fields
    const tracks = await this.trackService.findByAlbumId(id);
    for (const track of tracks) {
      await this.trackService.updateTrack(track.id, {
        ...track,
        artistId: track.artist?.id,
        albumId: null,
      });
    }

    // delete albumId from favorites
    const favoriteAlbum = await this.favoritesService.findAlbum(id);
    if (favoriteAlbum) {
      await this.favoritesService.deleteAlbum(id);
    }

    return this.albumsRepo.remove(album);
  }
}
