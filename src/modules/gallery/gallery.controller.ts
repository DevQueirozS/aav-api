/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// src/modules/gallery/gallery.controller.ts
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateGalleryDto } from './dto/create-gallery.dto';
import { ReorderGalleryDto } from './dto/reorder-gallery.dto';
import { UpdateGalleryDto } from './dto/update-gallery.dto';
import { GalleryService } from './gallery.service';

@Controller('gallery')
export class GalleryController {
  constructor(private readonly galleryService: GalleryService) {}

  // GET /gallery - Público
  @Get()
  async findAll() {
    return this.galleryService.findAll();
  }

  // GET /gallery/:id - Público
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.galleryService.findOne(id);
  }

  // POST /gallery - Protegido
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() dto: CreateGalleryDto, @Request() req: any) {
    const userId = req.user?.sub;
    return this.galleryService.create(dto, userId);
  }

  // PUT /gallery/:id - Protegido
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateGalleryDto,
  ) {
    return this.galleryService.update(id, dto);
  }

  // DELETE /gallery/:id - Protegido
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.galleryService.remove(id);
  }

  // POST /gallery/reorder - Protegido
  @UseGuards(JwtAuthGuard)
  @Post('reorder')
  async reorder(@Body() dto: ReorderGalleryDto) {
    return this.galleryService.reorder(dto.imageIds);
  }
}
