import { IsOptional, IsString } from 'class-validator';

export class CreateSettingsDto {
  @IsString()
  settingKey!: string;

  @IsString()
  settingValue!: string;

  @IsString()
  @IsOptional()
  settingType?: string;
}
