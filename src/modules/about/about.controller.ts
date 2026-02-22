/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
// src/modules/about/about.controller.ts
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
import { AboutService } from './about.service';
import { UpdateAboutDto } from './dto/update-about.dto';

@Controller('about')
export class AboutController {
  constructor(private readonly aboutService: AboutService) {}

  // GET /about - Público
  @Get()
  async findAll() {
    return this.aboutService.findAll();
  }

  // GET /about/:section - Público
  @Get(':section')
  async findBySection(@Param('section') section: string) {
    return this.aboutService.findBySection(section);
  }

  // PUT /about - Protegido (atualizar todas as seções)
  @UseGuards(JwtAuthGuard)
  @Put()
  async updateAll(@Body() dto: UpdateAboutDto, @Request() req: any) {
    const userId = req.user?.sub;
    return this.aboutService.updateAll(dto, userId);
  }

  // PUT /about/:section - Protegido (atualizar uma seção)
  @UseGuards(JwtAuthGuard)
  @Put(':section')
  async updateSection(
    @Param('section') section: string,
    @Body() body: { content: string },
    @Request() req: any,
  ) {
    const userId = req.user?.sub;
    return this.aboutService.updateSection(section, body.content, userId);
  }
}
