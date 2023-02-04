import { Module } from '@nestjs/common';
import { TracksModule } from 'src/tracks/tracks.module';
import { AlbumsController } from './albums.controller';
import { AlbumsRepository } from './albums.repository';
import { AlbumsService } from './albums.service';

@Module({
  imports: [TracksModule],
  providers: [AlbumsService, AlbumsRepository],
  exports: [AlbumsService],
  controllers: [AlbumsController],
})
export class AlbumsModule {}
