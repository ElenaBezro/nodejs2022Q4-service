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
import { CreateTrackDto } from './dtos/create-track.dto';
import { UpdateTrackDto } from './dtos/update-track.dto';
import { TracksService } from './tracks.service';

@Controller('track')
export class TracksController {
  constructor(
    private tracksService: TracksService,
    private favoritesService: FavoritesService,
  ) {}

  @Get()
  listTracks() {
    return this.tracksService.findAll();
  }

  @Post()
  //TODO: check id in payload
  createTrack(@Body() body: CreateTrackDto) {
    return this.tracksService.create(body);
  }

  @Get('/:id')
  async getTrack(@Param('id', ParseUUIDPipe) id: string) {
    const track = await this.tracksService.findOne(id);

    if (!track) {
      throw new NotFoundException('Track not found');
    }
    return track;
  }

  @Put('/:id')
  //TODO: check id in payload
  async updateTrack(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateTrackDto,
  ) {
    const track = await this.tracksService.findOne(id);

    if (!track) {
      throw new NotFoundException('Track not found');
    }

    const updatedTrack = await this.tracksService.updateTrack(id, body);

    return updatedTrack;
  }

  @Delete('/:id')
  @HttpCode(204)
  async deleteTrack(@Param('id', ParseUUIDPipe) id: string) {
    const track = await this.tracksService.findOne(id);

    if (!track) {
      throw new NotFoundException('Track not found');
    }

    // delete trackId from favorites
    const favorites = await this.favoritesService.findAllIds();
    if (favorites.tracks.includes(id)) {
      await this.favoritesService.deleteTrack(id);
    }
    await this.tracksService.deleteTrack(id);
  }
}
