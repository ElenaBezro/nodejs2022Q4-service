import { Album } from 'src/albums/types';
import { Artist } from 'src/artists/types';
import { Track } from 'src/tracks/types';

interface Favorites {
  artists: string[];
  albums: string[];
  tracks: string[];
}

interface FavoritesResponse {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}

export { Favorites, FavoritesResponse };
