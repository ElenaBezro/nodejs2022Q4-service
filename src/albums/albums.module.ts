import { TypeOrmModule } from '@nestjs/typeorm';
import { forwardRef, Module } from '@nestjs/common';

import { ArtistsModule } from '../artists/artists.module';
import { FavoritesModule } from '../favorites/favorites.module';
import { TracksModule } from '../tracks/tracks.module';

import { AlbumsController } from './albums.controller';
import { AlbumsService } from './albums.service';
import { Album } from './album.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([Album]),
    ArtistsModule,
    forwardRef(() => TracksModule),
    forwardRef(() => FavoritesModule),
  ],
  providers: [AlbumsService],
  exports: [AlbumsService],
  controllers: [AlbumsController],
})
export class AlbumsModule {}
