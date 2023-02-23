import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  NotFoundException,
} from '@nestjs/common';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { AlbumsService } from './albums.service';
import { AlbumDto } from './dtos/album.dto';
import { CreateAlbumDto } from './dtos/create-album.dto';
import { UpdateAlbumDto } from './dtos/update-album.dto';

@Controller('album')
export class AlbumsController {
  constructor(private albumsService: AlbumsService) {}

  @Get()
  listAlbums() {
    return this.albumsService.findAll();
  }

  @Post()
  @Serialize(AlbumDto)
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
  updateAlbum(@Param('id', ParseUUIDPipe) id: string, @Body() body: UpdateAlbumDto) {
    return this.albumsService.updateAlbum(id, body);
  }

  @Delete('/:id')
  @HttpCode(204)
  async deleteAlbum(@Param('id', ParseUUIDPipe) id: string) {
    await this.albumsService.deleteAlbum(id);
  }
}
