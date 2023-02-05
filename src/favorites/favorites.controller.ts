import { Controller, Get, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { AlbumsService } from 'src/albums/albums.service';
import { ArtistsService } from 'src/artists/artists.service';
import { TracksService } from 'src/tracks/tracks.service';
import { FavoritesService } from './favorites.service';

@Controller('favs')
export class FavoritesController {
  constructor(
    private favoritesService: FavoritesService,
    private artistsService: ArtistsService,
    private albumsService: AlbumsService,
    private tracksService: TracksService,
  ) {}

  @Get()
  async listFavorites() {
    const favoritesIds = await this.favoritesService.findAll();
    const favoritesResponse = {};
    for (const [key, arrayOfIds] of Object.entries(favoritesIds)) {
      // const serviceTypesByKey = {
      //   artists: 'artistsService',
      //   albums: 'albumsService',
      //   tracks: 'tracksService',
      // };
      const arrayOfEntities = await Promise.all(
        arrayOfIds.map(async (id: string) => {
          switch (key) {
            case 'artists':
              return await this.artistsService.findOne(id);
              break;
            case 'albums':
              return await this.albumsService.findOne(id);
              break;
            case 'tracks':
              return await this.tracksService.findOne(id);
              break;
          }
        }),
      );
      favoritesResponse[key] = arrayOfEntities;
    }
    return favoritesResponse;
  }

  @Post('/track/:id')
  // TODO: check if track is already in favs, check if track exists
  addTrack(@Param('id', ParseUUIDPipe) id: string) {
    return this.favoritesService.addTrack(id);
  }

  // @Get('/:id')
  // async getArtist(@Param('id', ParseUUIDPipe) id: string) {
  //   const artist = await this.favoritesService.findOne(id);

  //   if (!artist) {
  //     throw new NotFoundException('Artist not found');
  //   }
  //   return artist;
  // }

  // @Put('/:id')
  // async updateArtist(
  //   @Param('id', ParseUUIDPipe) id: string,
  //   @Body() body: UpdateArtistDto,
  // ) {
  //   const artist = await this.artistsService.findOne(id);

  //   if (!artist) {
  //     throw new NotFoundException('Artist not found');
  //   }

  //   const updatedArtist = await this.artistsService.updateArtist(id, body);

  //   return updatedArtist;
  // }

  // @Delete('/:id')
  // @HttpCode(204)
  // async deleteArtist(@Param('id', ParseUUIDPipe) id: string) {
  //   const artist = await this.artistsService.findOne(id);

  //   if (!artist) {
  //     throw new NotFoundException('Artist not found');
  //   }

  //   await this.artistsService.deleteArtist(id);
  //   const tracks = await this.trackService.findAll();
  //   for (const track of tracks) {
  //     if (track.artistId === id) {
  //       await this.trackService.updateTrack(track.id, {
  //         ...track,
  //         artistId: null,
  //       });
  //     }
  //   }
  // }
}
