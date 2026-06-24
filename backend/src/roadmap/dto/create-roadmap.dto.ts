// backend/src/roadmap/dto/create-roadmap.dto.ts

import { IsString, IsNotEmpty } from 'class-validator';

export class CreateRoadmapDto {
  @IsString()
  @IsNotEmpty()
  category: string;
}