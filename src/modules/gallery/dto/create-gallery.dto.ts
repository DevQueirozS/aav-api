// src/modules/gallery/dto/create-gallery.dto.ts
import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateGalleryDto {
  @IsString()
  title!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsString()
  imageUrl!: string;

  @IsOptional()
  @IsString()
  thumbnailUrl?: string;

  @IsOptional()
  @IsInt()
  position?: number;
}
