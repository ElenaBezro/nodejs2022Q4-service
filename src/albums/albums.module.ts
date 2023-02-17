import { TypeOrmModule } from '@nestjs/typeorm';
import { forwardRef, Module } from '@nestjs/common';
import { ArtistsModule } from 'src/artists/artists.module';
import { FavoritesModule } from 'src/favorites/favorites.module';
import { TracksModule } from 'src/tracks/tracks.module';
import { AlbumsController } from './albums.controller';
import { AlbumsRepository } from './albums.repository';
import { AlbumsService } from './albums.service';
import { Album } from './album.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([Album]),
    forwardRef(() => TracksModule),
    ArtistsModule,
    forwardRef(() => FavoritesModule),
  ],
  providers: [AlbumsService, AlbumsRepository],
  exports: [AlbumsService],
  controllers: [AlbumsController],
})
export class AlbumsModule {}
