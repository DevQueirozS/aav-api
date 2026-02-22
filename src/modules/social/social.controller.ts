/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// src/modules/social/social.controller.ts
import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateSocialDto } from './dto/create-social.dto';
import { UpdateSocialDto } from './dto/update-social.dto';
import { SocialService } from './social.service';

@Controller('social')
export class SocialController {
  constructor(private readonly socialService: SocialService) {}

  // GET /social - Público
  @Get()
  async findAll() {
    return this.socialService.findAll();
  }

  // GET /social/:platform - Público
  @Get(':platform')
  async findByPlatform(@Param('platform') platform: string) {
    return this.socialService.findByPlatform(platform);
  }

  // POST /social - Protegido (criar nova rede social)
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() dto: CreateSocialDto, @Request() req: any) {
    const userId = req.user?.sub;
    return this.socialService.create(dto, userId);
  }

  // PUT /social - Protegido (atualizar múltiplos links)
  @UseGuards(JwtAuthGuard)
  @Put()
  async updateAll(@Body() dto: UpdateSocialDto, @Request() req: any) {
    const userId = req.user?.sub;
    return this.socialService.updateAll(dto, userId);
  }

  // PUT /social/:platform - Protegido (atualizar um link)
  @UseGuards(JwtAuthGuard)
  @Put(':platform')
  async updateByPlatform(
    @Param('platform') platform: string,
    @Body() body: { url: string },
    @Request() req: any,
  ) {
    const userId = req.user?.sub;
    return this.socialService.updateByPlatform(platform, body.url, userId);
  }

  // PATCH /social/:platform/toggle - Protegido (ativar/desativar)
  @UseGuards(JwtAuthGuard)
  @Patch(':platform/toggle')
  async toggleActive(
    @Param('platform') platform: string,
    @Body() body: { isActive: boolean },
  ) {
    return this.socialService.toggleActive(platform, body.isActive);
  }
}
