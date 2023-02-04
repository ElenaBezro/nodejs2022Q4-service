import { Module } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';
import { TracksRepository } from './tracks.repository';

@Module({
  providers: [TracksService, TracksRepository],
  exports: [TracksService],
  controllers: [TracksController],
})
export class TracksModule {}
