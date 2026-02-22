// src/modules/gallery/gallery.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateGalleryDto } from './dto/create-gallery.dto';
import { UpdateGalleryDto } from './dto/update-gallery.dto';

@Injectable()
export class GalleryService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.gallery.findMany({
      include: {
        users: {
          select: {
            id: true,
            username: true,
          },
        },
      },
      orderBy: [
        {
          position: 'asc',
        },
        {
          createdAt: 'desc',
        },
      ],
    });
  }

  async findOne(id: number) {
    return this.prisma.gallery.findUnique({
      where: { id },
      include: {
        users: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });
  }

  async create(dto: CreateGalleryDto, userId?: number) {
    return this.prisma.gallery.create({
      data: {
        title: dto.title,
        description: dto.description,
        imageUrl: dto.imageUrl,
        thumbnailUrl: dto.thumbnailUrl,
        position: dto.position,
        createdBy: userId,
      },
    });
  }

  async update(id: number, dto: UpdateGalleryDto) {
    return this.prisma.gallery.update({
      where: { id },
      data: {
        title: dto.title,
        description: dto.description,
        position: dto.position,
      },
    });
  }

  async remove(id: number) {
    return this.prisma.gallery.delete({
      where: { id },
    });
  }

  async reorder(imageIds: number[]) {
    // Atualizar posição de cada imagem
    const updates = imageIds.map((id, index) =>
      this.prisma.gallery.update({
        where: { id },
        data: { position: index },
      }),
    );

    return Promise.all(updates);
  }
}
