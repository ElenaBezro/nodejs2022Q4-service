// import { readFile, writeFile } from 'fs/promises';
import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';
import { UpdateTrackDto } from './dtos/update-track.dto';
// import { UpdatePasswordDto } from './dtos/update-password.dto';
import { Track } from './types';

@Injectable()
export class TracksRepository {
  private tracks: Record<string, Track> = {};

  async findOne(trackId: string) {
    const track = this.tracks[trackId];
    return track;
  }
  async findAll() {
    const tracks = Object.values(this.tracks);
    return tracks;
  }
  async create(track: Omit<Track, 'id'>) {
    const id = v4();
    const { name, artistId, albumId, duration } = track;
    const newTrack = { id, name, artistId, albumId, duration };
    this.tracks[id] = newTrack;
    return newTrack;
  }

  async updateTrack(id: string, trackDto: UpdateTrackDto) {
    const track = this.tracks[id];
    const { name, artistId, albumId, duration } = trackDto;
    const updatedTrack = { ...track, name, artistId, albumId, duration };
    this.tracks[id] = updatedTrack;
    return updatedTrack;
  }

  async deleteTrack(id: string) {
    const track = this.tracks[id];
    return track && delete this.tracks[id];
  }
}
