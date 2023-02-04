import { Module } from '@nestjs/common';
import { AlbumsController } from './albums.controller';
import { AlbumsRepository } from './albums.repository';
import { AlbumsService } from './albums.service';

@Module({
  providers: [AlbumsService, AlbumsRepository],
  exports: [AlbumsService],
  controllers: [AlbumsController],
})
export class AlbumsModule {}
