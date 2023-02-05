import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { FavoritesService } from 'src/favorites/favorites.service';
import { TracksService } from 'src/tracks/tracks.service';
import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dtos/create-album.dto';
import { UpdateAlbumDto } from './dtos/update-album.dto';

@Controller('album')
export class AlbumsController {
  constructor(
    private albumsService: AlbumsService,
    private trackService: TracksService,
    private favoritesService: FavoritesService,
  ) {}

  @Get()
  listAlbums() {
    return this.albumsService.findAll();
  }

  @Post()
  //TODO: check id in payload
  createAlbum(@Body() body: CreateAlbumDto) {
    return this.albumsService.create(body);
  }

  @Get('/:id')
  async getAlbum(@Param('id', ParseUUIDPipe) id: string) {
    const album = await this.albumsService.findOne(id);

    if (!album) {
      throw new NotFoundException('Album not found');
    }
    return album;
  }

  @Put('/:id')
  //TODO: check id in payload
  async updateAlbum(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateAlbumDto,
  ) {
    const album = await this.albumsService.findOne(id);

    if (!album) {
      throw new NotFoundException('Album not found');
    }

    const updatedAlbum = await this.albumsService.updateAlbum(id, body);

    return updatedAlbum;
  }

  @Delete('/:id')
  @HttpCode(204)
  async deleteAlbum(@Param('id', ParseUUIDPipe) id: string) {
    const album = await this.albumsService.findOne(id);

    if (!album) {
      throw new NotFoundException('Album not found');
    }

    await this.albumsService.deleteAlbum(id);

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
  }
}
