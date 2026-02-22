// src/modules/publications/dto/create-publication.dto.ts
import { IsOptional, IsString } from 'class-validator';

export class CreatePublicationDto {
  @IsString()
  type!: string;

  @IsString()
  title!: string;

  @IsString()
  description!: string;

  @IsOptional()
  @IsString()
  url?: string;

  @IsOptional()
  @IsString()
  link?: string;
}
