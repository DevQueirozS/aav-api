/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
// src/modules/settings/settings.controller.ts
import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UpdateSettingsDto } from './dto/update-settings.dto';
import { SettingsService } from './settings.service';

@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  // GET /settings - Público
  @Get()
  async findAll() {
    return this.settingsService.findAll();
  }

  // GET /settings/:key - Público
  @Get(':key')
  async findByKey(@Param('key') key: string) {
    return this.settingsService.findByKey(key);
  }

  // PUT /settings - Protegido (atualizar múltiplas configurações)
  @UseGuards(JwtAuthGuard)
  @Put()
  async updateAll(@Body() dto: UpdateSettingsDto, @Request() req: any) {
    const userId = req.user?.sub;
    return this.settingsService.updateAll(dto, userId);
  }

  // PUT /settings/:key - Protegido (atualizar uma configuração)
  @UseGuards(JwtAuthGuard)
  @Put(':key')
  async updateByKey(
    @Param('key') key: string,
    @Body() body: { value: string },
    @Request() req: any,
  ) {
    const userId = req.user?.sub;
    return this.settingsService.updateByKey(key, body.value, userId);
  }
}
