import { TypeOrmModule } from '@nestjs/typeorm';
import { forwardRef, Module } from '@nestjs/common';
import { AlbumsModule } from 'src/albums/albums.module';
import { ArtistsModule } from 'src/artists/artists.module';
import { TracksModule } from 'src/tracks/tracks.module';
import { FavoritesController } from './favorites.controller';
import { FavoritesRepository } from './favorites.repository';
import { FavoritesService } from './favorites.service';
import { Favorites } from './favorites.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Favorites]),
    forwardRef(() => AlbumsModule),
    forwardRef(() => ArtistsModule),
    forwardRef(() => TracksModule),
  ],
  controllers: [FavoritesController],
  exports: [FavoritesService],
  providers: [FavoritesService, FavoritesRepository],
})
export class FavoritesModule {}
