import { forwardRef, Module } from '@nestjs/common';
import { FavoritesModule } from 'src/favorites/favorites.module';
import { TracksModule } from 'src/tracks/tracks.module';
import { AlbumsController } from './albums.controller';
import { AlbumsRepository } from './albums.repository';
import { AlbumsService } from './albums.service';

@Module({
  imports: [TracksModule, forwardRef(() => FavoritesModule)],
  providers: [AlbumsService, AlbumsRepository],
  exports: [AlbumsService],
  controllers: [AlbumsController],
})
export class AlbumsModule {}
