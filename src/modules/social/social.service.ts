/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
// src/modules/social/social.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateSocialDto } from './dto/create-social.dto';
import { UpdateSocialDto } from './dto/update-social.dto';

@Injectable()
export class SocialService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.socialLink.findMany({
      where: {
        isActive: true,
      },
      orderBy: {
        position: 'asc',
      },
    });
  }

  async findByPlatform(platform: string) {
    return this.prisma.socialLink.findUnique({
      where: { platform },
    });
  }

  async create(dto: CreateSocialDto, userId?: number) {
    return this.prisma.socialLink.create({
      data: {
        platform: dto.platform,
        url: dto.url,
        displayName: dto.displayName,
        icon: dto.icon,
        position: dto.position || 0,
        updatedBy: userId,
      },
    });
  }

  async updateByPlatform(platform: string, url: string, userId?: number) {
    return this.prisma.socialLink.update({
      where: { platform },
      data: {
        url,
        updatedBy: userId,
      },
    });
  }

  async updateAll(dto: UpdateSocialDto, userId?: number) {
    const updates: Promise<any>[] = [];

    if (dto.instagram) {
      updates.push(this.updateByPlatform('instagram', dto.instagram, userId));
    }
    if (dto.facebook) {
      updates.push(this.updateByPlatform('facebook', dto.facebook, userId));
    }
    if (dto.youtube) {
      updates.push(this.updateByPlatform('youtube', dto.youtube, userId));
    }
    if (dto.email) {
      updates.push(this.updateByPlatform('email', dto.email, userId));
    }

    await Promise.all(updates);

    return { message: `${updates.length} link(s) atualizado(s)` };
  }

  async toggleActive(platform: string, isActive: boolean) {
    return this.prisma.socialLink.update({
      where: { platform },
      data: { isActive },
    });
  }
}
