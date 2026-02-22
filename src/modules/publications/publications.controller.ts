/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// src/modules/publications/publications.controller.ts
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { UpdatePublicationDto } from './dto/update-publication.dto';
import { PublicationsService } from './publications.service';

@Controller('publications')
export class PublicationsController {
  constructor(private readonly publicationsService: PublicationsService) {}

  // GET /publications - Público
  @Get()
  async findAll() {
    return this.publicationsService.findAll();
  }

  // GET /publications/:id - Público
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.publicationsService.findOne(id);
  }

  // POST /publications - Protegido
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() dto: CreatePublicationDto, @Request() req: any) {
    const userId = req.user?.sub;
    return this.publicationsService.create(dto, userId);
  }

  // PUT /publications/:id - Protegido
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdatePublicationDto,
  ) {
    return this.publicationsService.update(id, dto);
  }

  // DELETE /publications/:id - Protegido
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.publicationsService.remove(id);
  }

  // PATCH /publications/:id/views - Incrementar views
  @Patch(':id/views')
  async incrementViews(@Param('id', ParseIntPipe) id: number) {
    return this.publicationsService.incrementViews(id);
  }

  // PATCH /publications/:id/clicks - Incrementar clicks
  @Patch(':id/clicks')
  async incrementClicks(@Param('id', ParseIntPipe) id: number) {
    return this.publicationsService.incrementClicks(id);
  }
}
