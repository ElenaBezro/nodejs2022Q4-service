import { Injectable } from '@nestjs/common';
import { UpdateTrackDto } from './dtos/update-track.dto';
//import { ArtistsService } from 'src/artists/artists.service';
import { TracksRepository } from './tracks.repository';
import { Track } from './types';

@Injectable()
export class TracksService {
  // constructor(private artistsService: ArtistsService) {}
  constructor(public tracksRepo: TracksRepository) {}

  async findOne(id: string) {
    return await this.tracksRepo.findOne(id);
  }
  findAll() {
    return this.tracksRepo.findAll();
  }
  create(track: Omit<Track, 'id'>) {
    return this.tracksRepo.create(track);
  }
  updateTrack(id: string, body: UpdateTrackDto) {
    return this.tracksRepo.updateTrack(id, body);
  }
  deleteTrack(id: string) {
    return this.tracksRepo.deleteTrack(id);
  }
}
