import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateSettingsDto {
  @IsString()
  @IsOptional()
  site_title?: string;

  @IsString()
  @IsOptional()
  site_subtitle?: string;

  @IsString()
  @IsOptional()
  vakinha_link?: string;

  @IsString()
  @IsOptional()
  contact_phone?: string;

  @IsEmail()
  @IsOptional()
  contact_email?: string;

  @IsString()
  @IsOptional()
  contact_address?: string;
}
