import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AlbumsModule } from './albums/albums.module';
import { FavoritesModule } from './favorites/favorites.module';
import { TracksModule } from './tracks/tracks.module';
import { UsersModule } from './users/users.module';
import { ArtistsModule } from './artists/artists.module';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { User } from './users/user.entity';
// import { Album } from './albums/album.entity';
// import { Artist } from './artists/artist.entity';
// import { Favorites } from './favorites/favorites.entity';
// import { Track } from './tracks/track.entity';
import { configService } from './config/config.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    AlbumsModule,
    FavoritesModule,
    TracksModule,
    UsersModule,
    ArtistsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
