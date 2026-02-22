/* eslint-disable @typescript-eslint/no-unsafe-return */

/* eslint-disable @typescript-eslint/no-unsafe-member-access */
// src/modules/about/about.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { UpdateAboutDto } from './dto/update-about.dto';

@Injectable()
export class AboutService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    const sections = await this.prisma.aboutContent.findMany({
      orderBy: {
        id: 'asc',
      },
    });

    // Transformar array em objeto
    const content: any = {};
    sections.forEach((section) => {
      content[section.section] = section.content;
    });

    return content;
  }

  async findBySection(section: string) {
    return this.prisma.aboutContent.findUnique({
      where: { section },
    });
  }

  async updateSection(section: string, content: string, userId?: number) {
    return this.prisma.aboutContent.upsert({
      where: { section },
      update: {
        content,
        updatedBy: userId,
      },
      create: {
        section,
        content,
        updatedBy: userId,
      },
    });
  }

  async updateAll(dto: UpdateAboutDto, userId?: number) {
    const updates: Promise<any>[] = [];

    if (dto.intro !== undefined) {
      updates.push(this.updateSection('intro', dto.intro, userId));
    }
    if (dto.mission !== undefined) {
      updates.push(this.updateSection('mission', dto.mission, userId));
    }
    if (dto.work !== undefined) {
      updates.push(this.updateSection('work', dto.work, userId));
    }
    if (dto.values !== undefined) {
      updates.push(this.updateSection('values', dto.values, userId));
    }

    await Promise.all(updates);

    return { message: `${updates.length} seção(ões) atualizada(s)` };
  }
}
