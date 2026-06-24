// backend/src/question/question.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateQuestionDto } from './dto/create-question.dto';

@Injectable()
export class QuestionService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateQuestionDto) {
    const quiz = await this.prisma.quiz.findUnique({
      where: { id: dto.quizId },
    });
    if (!quiz) {
      throw new NotFoundException('Quiz not found');
    }

    return this.prisma.question.create({
      data: {
        quizId: dto.quizId,
        questionText: dto.questionText,
        options: dto.options,
        correctOption: dto.correctOption,
        topic: dto.topic,
      },
    });
  }

  async findByQuiz(quizId: string) {
    return this.prisma.question.findMany({
      where: { quizId },
      orderBy: { id: 'asc' },
    });
  }

  async update(id: string, dto: Partial<CreateQuestionDto>) {
    const existing = await this.prisma.question.findUnique({ where: { id } });
    if (!existing) {
      throw new NotFoundException('Question not found');
    }

    return this.prisma.question.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    const existing = await this.prisma.question.findUnique({ where: { id } });
    if (!existing) {
      throw new NotFoundException('Question not found');
    }

    return this.prisma.question.delete({ where: { id } });
  }
}