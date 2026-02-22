// src/modules/users/users.service.ts
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        username: true,
        role: true,
        createdAt: true,
        lastLogin: true,
      },
    });
  }

  async findOne(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        username: true,
        role: true,
        createdAt: true,
        lastLogin: true,
      },
    });
  }

  async findByUsername(username: string) {
    return this.prisma.user.findUnique({
      where: { username },
    });
  }

  async create(dto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    return this.prisma.user.create({
      data: {
        username: dto.username,
        passwordHash: hashedPassword,
        role: dto.role,
      },
      select: {
        id: true,
        username: true,
        role: true,
        createdAt: true,
      },
    });
  }

  async updateLastLogin(id: number) {
    return this.prisma.user.update({
      where: { id },
      data: {
        lastLogin: new Date(),
      },
    });
  }
}
