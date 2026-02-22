import { IsEnum, IsString, MinLength } from 'class-validator';

export enum AboutSection {
  INTRO = 'intro',
  MISSION = 'mission',
  WORK = 'work',
  VALUES = 'values',
}

export class CreateAboutDto {
  @IsEnum(AboutSection)
  section!: AboutSection;

  @IsString()
  @MinLength(5)
  content!: string;
}
