import { forwardRef, Module } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';
import { TracksRepository } from './tracks.repository';
import { FavoritesModule } from 'src/favorites/favorites.module';

@Module({
  imports: [forwardRef(() => FavoritesModule)],
  providers: [TracksService, TracksRepository],
  exports: [TracksService],
  controllers: [TracksController],
})
export class TracksModule {}
