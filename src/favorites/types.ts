import { Album } from '../albums/types';
import { Artist } from '../artists/types';
import { Track } from '../tracks/types';

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
