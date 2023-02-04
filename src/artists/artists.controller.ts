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
import { TracksService } from 'src/tracks/tracks.service';
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dtos/create-artist.dto';
import { UpdateArtistDto } from './dtos/update-artist.dto';

@Controller('artist')
export class ArtistsController {
  constructor(
    private artistsService: ArtistsService,
    private trackService: TracksService,
  ) {}

  @Get()
  listArtists() {
    return this.artistsService.findAll();
  }

  @Post()
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
  async updateArtist(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateArtistDto,
  ) {
    const artist = await this.artistsService.findOne(id);

    if (!artist) {
      throw new NotFoundException('Artist not found');
    }

    const updatedArtist = await this.artistsService.updateArtist(id, body);

    return updatedArtist;
  }

  @Delete('/:id')
  @HttpCode(204)
  async deleteArtist(@Param('id', ParseUUIDPipe) id: string) {
    const artist = await this.artistsService.findOne(id);

    if (!artist) {
      throw new NotFoundException('Artist not found');
    }

    await this.artistsService.deleteArtist(id);
    const tracks = await this.trackService.findAll();
    for (const track of tracks) {
      if (track.artistId === id) {
        await this.trackService.updateTrack(track.id, {
          ...track,
          artistId: null,
        });
      }
    }
  }
}
