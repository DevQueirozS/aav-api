// src/modules/gallery/dto/reorder-gallery.dto.ts
import { IsArray, IsInt } from 'class-validator';

export class ReorderGalleryDto {
  @IsArray()
  @IsInt({ each: true })
  imageIds!: number[];
}
