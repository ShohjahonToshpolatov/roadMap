// backend/src/roadmap/roadmap.controller.ts

import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { RoadmapService } from './roadmap.service';
import { CreateRoadmapDto } from './dto/create-roadmap.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('roadmaps')
export class RoadmapController {
  constructor(private readonly roadmapService: RoadmapService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Request() req, @Body() dto: CreateRoadmapDto) {
    return this.roadmapService.create(req.user.id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('my')
  async findByUser(@Request() req) {
    return this.roadmapService.findByUser(req.user.id);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.roadmapService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id/steps')
  async updateSteps(@Request() req, @Param('id') id: string, @Body() body: { stepsData: any }) {
    return this.roadmapService.updateSteps(id, req.user.id, body.stepsData);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Request() req, @Param('id') id: string) {
    return this.roadmapService.remove(id, req.user.id);
  }
}