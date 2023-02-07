import { IsNumber, IsString, ValidateIf } from 'class-validator';

export class UpdateAlbumDto {
  @IsString()
  name: string;
  @IsNumber()
  year: number;
  @IsString()
  @ValidateIf((_, value) => value !== null)
  artistId: string | null; // refers to Artist
}
