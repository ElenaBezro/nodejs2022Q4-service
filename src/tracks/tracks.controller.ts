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
import { CreateTrackDto } from './dtos/create-track.dto';
import { UpdateTrackDto } from './dtos/update-track.dto';
import { TracksService } from './tracks.service';

@Controller('track')
export class TracksController {
  constructor(private tracksService: TracksService) {}

  @Get()
  listTracks() {
    return this.tracksService.findAll();
  }

  @Post()
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

    await this.tracksService.deleteTrack(id);
    //TODO: delete track from favorites
  }
}
