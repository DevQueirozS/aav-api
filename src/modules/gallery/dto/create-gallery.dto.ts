import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateGalleryDto {
  @IsString()
  title!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsString()
  imageUrl!: string;

  @IsString()
  thumbnailUrl!: string;

  @IsInt()
  position!: number;
}
