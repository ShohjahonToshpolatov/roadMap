// backend/src/app.module.ts

import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { QuizModule } from './quiz/quiz.module';
import { QuestionModule } from './question/question.module';
import { RoadmapModule } from './roadmap/roadmap.module';

@Module({
  imports: [PrismaModule, AuthModule, QuizModule, QuestionModule, RoadmapModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
