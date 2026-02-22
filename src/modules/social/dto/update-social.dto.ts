import { IsOptional, IsUrl } from 'class-validator';

export class UpdateSocialDto {
  @IsUrl()
  @IsOptional()
  instagram?: string;

  @IsUrl()
  @IsOptional()
  facebook?: string;

  @IsUrl()
  @IsOptional()
  youtube?: string;

  @IsUrl()
  @IsOptional()
  email?: string; // Se for link de "mailto:" use @IsString() em vez de @IsUrl()
}
