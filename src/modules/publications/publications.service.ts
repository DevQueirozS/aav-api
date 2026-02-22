// src/modules/publications/publications.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { UpdatePublicationDto } from './dto/update-publication.dto';

@Injectable()
export class PublicationsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.publication.findMany({
      include: {
        users: {
          select: {
            id: true,
            username: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: number) {
    return this.prisma.publication.findUnique({
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

  async create(dto: CreatePublicationDto, userId?: number) {
    return this.prisma.publication.create({
      data: {
        type: dto.type,
        title: dto.title,
        description: dto.description || '',
        url: dto.url || '',
        link: dto.link,
        createdBy: userId,
      },
    });
  }

  async update(id: number, dto: UpdatePublicationDto) {
    return this.prisma.publication.update({
      where: { id },
      data: {
        title: dto.title,
        description: dto.description,
        link: dto.link,
      },
    });
  }

  async remove(id: number) {
    return this.prisma.publication.delete({
      where: { id },
    });
  }

  async incrementViews(id: number) {
    return this.prisma.publication.update({
      where: { id },
      data: {
        views: {
          increment: 1,
        },
      },
    });
  }

  async incrementClicks(id: number) {
    return this.prisma.publication.update({
      where: { id },
      data: {
        clicks: {
          increment: 1,
        },
      },
    });
  }
}
