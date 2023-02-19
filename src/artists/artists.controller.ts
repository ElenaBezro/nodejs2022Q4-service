import { Body, Controller, Delete, Get, HttpCode, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dtos/create-artist.dto';
import { UpdateArtistDto } from './dtos/update-artist.dto';

@Controller('artist')
export class ArtistsController {
  constructor(private artistsService: ArtistsService) {}

  @Get()
  listArtists() {
    return this.artistsService.findAll();
  }

  @Post()
  createArtist(@Body() body: CreateArtistDto) {
    return this.artistsService.create(body);
  }

  @Get('/:id')
  getArtist(@Param('id', ParseUUIDPipe) id: string) {
    return this.artistsService.findOne(id);
  }

  @Put('/:id')
  updateArtist(@Param('id', ParseUUIDPipe) id: string, @Body() body: UpdateArtistDto) {
    return this.artistsService.updateArtist(id, body);
  }

  @Delete('/:id')
  @HttpCode(204)
  async deleteArtist(@Param('id', ParseUUIDPipe) id: string) {
    await this.artistsService.deleteArtist(id);
  }
}
