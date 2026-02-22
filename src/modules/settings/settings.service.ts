/* eslint-disable @typescript-eslint/no-unsafe-return */

/* eslint-disable @typescript-eslint/no-unsafe-member-access */
// src/modules/settings/settings.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { UpdateSettingsDto } from './dto/update-settings.dto';

@Injectable()
export class SettingsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    const settings = await this.prisma.siteSetting.findMany();

    // Transformar array em objeto
    const settingsObj: any = {};
    settings.forEach((setting) => {
      settingsObj[setting.settingKey] = setting.settingValue;
    });

    return settingsObj;
  }

  async findByKey(key: string) {
    return this.prisma.siteSetting.findUnique({
      where: { settingKey: key },
    });
  }

  async updateByKey(key: string, value: string, userId?: number) {
    return this.prisma.siteSetting.update({
      where: { settingKey: key },
      data: {
        settingValue: value,
        updatedBy: userId,
      },
    });
  }

  async updateAll(dto: UpdateSettingsDto, userId?: number) {
    const updates: Promise<any>[] = [];

    if (dto.site_title !== undefined) {
      updates.push(this.updateByKey('site_title', dto.site_title, userId));
    }
    if (dto.site_subtitle !== undefined) {
      updates.push(
        this.updateByKey('site_subtitle', dto.site_subtitle, userId),
      );
    }
    if (dto.vakinha_link !== undefined) {
      updates.push(this.updateByKey('vakinha_link', dto.vakinha_link, userId));
    }
    if (dto.contact_phone !== undefined) {
      updates.push(
        this.updateByKey('contact_phone', dto.contact_phone, userId),
      );
    }
    if (dto.contact_email !== undefined) {
      updates.push(
        this.updateByKey('contact_email', dto.contact_email, userId),
      );
    }
    if (dto.contact_address !== undefined) {
      updates.push(
        this.updateByKey('contact_address', dto.contact_address, userId),
      );
    }

    await Promise.all(updates);

    return { message: `${updates.length} configuração(ões) atualizada(s)` };
  }
}
