import { IsOptional, IsString } from 'class-validator';

export class UpdateAboutDto {
  @IsOptional()
  @IsString()
  intro?: string;

  @IsOptional()
  @IsString()
  mission?: string;

  @IsOptional()
  @IsString()
  work?: string;

  @IsOptional()
  @IsString()
  values?: string;
}
