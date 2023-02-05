import { forwardRef, Module } from '@nestjs/common';
import { AlbumsModule } from 'src/albums/albums.module';
import { ArtistsModule } from 'src/artists/artists.module';
import { TracksModule } from 'src/tracks/tracks.module';
import { FavoritesController } from './favorites.controller';
import { FavoritesRepository } from './favorites.repository';
import { FavoritesService } from './favorites.service';

@Module({
  imports: [
    forwardRef(() => AlbumsModule),
    forwardRef(() => ArtistsModule),
    forwardRef(() => TracksModule),
  ],
  controllers: [FavoritesController],
  exports: [FavoritesService],
  providers: [FavoritesService, FavoritesRepository],
})
export class FavoritesModule {}
