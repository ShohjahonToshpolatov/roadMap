// backend/src/roadmap/roadmap.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRoadmapDto } from './dto/create-roadmap.dto';

@Injectable()
export class RoadmapService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, dto: CreateRoadmapDto) {
    const defaultSteps = [
      { step: 1, title: 'Assessment', description: 'Complete psychological assessment quiz', completed: false },
      { step: 2, title: 'Awareness', description: 'Understand your emotional patterns', completed: false },
      { step: 3, title: 'Action Plan', description: 'Create personalized growth strategies', completed: false },
      { step: 4, title: 'Practice', description: 'Implement daily mindfulness exercises', completed: false },
      { step: 5, title: 'Reflection', description: 'Review progress and adjust roadmap', completed: false },
    ];

    return this.prisma.roadmap.create({
      data: {
        userId,
        category: dto.category,
        stepsData: defaultSteps,
      },
    });
  }

  async findByUser(userId: string) {
    return this.prisma.roadmap.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const roadmap = await this.prisma.roadmap.findUnique({
      where: { id },
    });

    if (!roadmap) {
      throw new NotFoundException('Roadmap not found');
    }

    return roadmap;
  }

  async updateSteps(id: string, userId: string, stepsData: any) {
    const existing = await this.prisma.roadmap.findFirst({
      where: { id, userId },
    });

    if (!existing) {
      throw new NotFoundException('Roadmap not found');
    }

    return this.prisma.roadmap.update({
      where: { id },
      data: { stepsData },
    });
  }

  async remove(id: string, userId: string) {
    const existing = await this.prisma.roadmap.findFirst({
      where: { id, userId },
    });

    if (!existing) {
      throw new NotFoundException('Roadmap not found');
    }

    return this.prisma.roadmap.delete({ where: { id } });
  }
}