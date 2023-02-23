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
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { FavoritesService } from '../favorites/favorites.service';
import { CreateTrackDto } from './dtos/create-track.dto';
import { TrackDto } from './dtos/track.dto';
import { UpdateTrackDto } from './dtos/update-track.dto';
import { TracksService } from './tracks.service';

@Controller('track')
@Serialize(TrackDto)
export class TracksController {
  constructor(private tracksService: TracksService, private favoritesService: FavoritesService) {}

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
  async updateTrack(@Param('id', ParseUUIDPipe) id: string, @Body() body: UpdateTrackDto) {
    const track = await this.tracksService.findOne(id);

    if (!track) {
      throw new NotFoundException('Track not found');
    }

    return await this.tracksService.updateTrack(id, body);
  }

  @Delete('/:id')
  @HttpCode(204)
  deleteTrack(@Param('id', ParseUUIDPipe) id: string) {
    return this.tracksService.deleteTrack(id);
  }
}
