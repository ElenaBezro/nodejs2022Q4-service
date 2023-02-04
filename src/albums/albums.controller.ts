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
import { AlbumsService } from './albums.service';
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
    //TODO: delete album from favorites
  }
}
