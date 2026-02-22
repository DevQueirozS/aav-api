import { IsBoolean, IsInt, IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateSocialDto {
  @IsString()
  platform!: string;

  @IsUrl()
  url!: string;

  @IsString()
  displayName!: string;

  @IsString()
  @IsOptional()
  icon?: string;

  @IsInt()
  @IsOptional()
  position?: number;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
