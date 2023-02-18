import { Body, Controller, Delete, Get, HttpCode, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
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
  createAlbum(@Body() body: CreateAlbumDto) {
    return this.albumsService.create(body);
  }

  @Get('/:id')
  async getAlbum(@Param('id', ParseUUIDPipe) id: string) {
    return await this.albumsService.findOne(id);
  }

  @Put('/:id')
  async updateAlbum(@Param('id', ParseUUIDPipe) id: string, @Body() body: UpdateAlbumDto) {
    return await this.albumsService.updateAlbum(id, body);
  }

  @Delete('/:id')
  @HttpCode(204)
  async deleteAlbum(@Param('id', ParseUUIDPipe) id: string) {
    await this.albumsService.deleteAlbum(id);
  }
}
