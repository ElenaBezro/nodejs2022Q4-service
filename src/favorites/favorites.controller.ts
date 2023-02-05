import {
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  UnprocessableEntityException,
} from '@nestjs/common';
import { AlbumsService } from 'src/albums/albums.service';
import { ArtistsService } from 'src/artists/artists.service';
import { TracksService } from 'src/tracks/tracks.service';
import { FavoritesService } from './favorites.service';

@Controller('favs')
export class FavoritesController {
  constructor(
    private favoritesService: FavoritesService,
    private artistsService: ArtistsService,
    private albumsService: AlbumsService,
    private tracksService: TracksService,
  ) {}

  @Get()
  listFavorites() {
    return this.favoritesService.findAll();
  }

  @Post('/track/:id')
  async addTrack(@Param('id', ParseUUIDPipe) id: string) {
    const track = await this.tracksService.findOne(id);
    if (!track) throw new UnprocessableEntityException('Track not found');

    this.favoritesService.addTrack(id);
    return 'Track is in favorites!';
  }

  @Post('/artist/:id')
  async addArtist(@Param('id', ParseUUIDPipe) id: string) {
    const artist = await this.artistsService.findOne(id);
    if (!artist) throw new UnprocessableEntityException('Artist not found');

    this.favoritesService.addArtist(id);
    return 'Artist is in favorites!';
  }

  @Post('/album/:id')
  async addAlbum(@Param('id', ParseUUIDPipe) id: string) {
    const album = await this.albumsService.findOne(id);
    if (!album) throw new UnprocessableEntityException('Album not found');

    this.favoritesService.addAlbum(id);
    return 'Album is in favorites!';
  }

  @Delete('track/:id')
  @HttpCode(204)
  async deleteTrack(@Param('id', ParseUUIDPipe) id: string) {
    const isFavorite = await this.favoritesService.findTrack(id);

    if (!isFavorite) {
      throw new NotFoundException('Is not in favorites');
    }
    await this.favoritesService.deleteTrack(id);
  }

  @Delete('artist/:id')
  @HttpCode(204)
  async deleteArtist(@Param('id', ParseUUIDPipe) id: string) {
    const isFavorite = await this.favoritesService.findArtist(id);

    if (!isFavorite) {
      throw new NotFoundException('Is not in favorites');
    }
    await this.favoritesService.deleteArtist(id);
  }

  @Delete('album/:id')
  @HttpCode(204)
  async deleteAlbum(@Param('id', ParseUUIDPipe) id: string) {
    const isFavorite = await this.favoritesService.findAlbum(id);

    if (!isFavorite) {
      throw new NotFoundException('Is not in favorites');
    }
    await this.favoritesService.deleteAlbum(id);
  }
}
