import { Module } from '@nestjs/common';
import { ArtistsModule } from 'src/artists/artists.module';
import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';
import { TracksRepository } from './tracks.repository';

@Module({
  imports: [ArtistsModule],
  providers: [TracksService, TracksRepository],
  exports: [TracksService],
  controllers: [TracksController],
})
export class TracksModule {}
