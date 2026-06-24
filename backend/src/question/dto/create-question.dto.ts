// backend/src/question/dto/create-question.dto.ts

import { IsString, IsArray, IsUUID } from 'class-validator';

export class CreateQuestionDto {
  @IsUUID()
  quizId: string;

  @IsString()
  questionText: string;

  @IsArray()
  options: string[];

  @IsString()
  correctOption: string;

  @IsString()
  topic: string;
}