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
import { ArtistsService } from './artists.service';
import { ArtistDto } from './dtos/artist.dto';
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
  @Serialize(ArtistDto)
  createArtist(@Body() body: CreateArtistDto) {
    return this.artistsService.create(body);
  }

  @Get('/:id')
  async getArtist(@Param('id', ParseUUIDPipe) id: string) {
    const artist = await this.artistsService.findOne(id);
    if (!artist) {
      throw new NotFoundException('Artist not found');
    }
    return artist;
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
