import { Controller, Get, Post, Param, Body, Query, UseGuards } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Get()
  findAll(
    @Query('type') type?: string,
    @Query('difficulty') difficulty?: string,
    @Query('search') search?: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    return this.roomsService.findAll({ type, difficulty, search, page, limit });
  }

  @Get(':slug')
  findBySlug(@Param('slug') slug: string) {
    return this.roomsService.findBySlug(slug);
  }

  @Get(':slug/tasks')
  getTasks(@Param('slug') slug: string) {
    return this.roomsService.getTasks(slug);
  }

  @Post(':slug/deploy')
  @UseGuards(JwtAuthGuard)
  deployMachine(@Param('slug') slug: string, @Body() body: { userId: string }) {
    return this.roomsService.deployMachine(slug, body.userId);
  }

  @Post(':slug/tasks/:taskId/submit')
  @UseGuards(JwtAuthGuard)
  submitAnswer(
    @Param('slug') slug: string,
    @Param('taskId') taskId: string,
    @Body() body: { answer: string; userId: string },
  ) {
    return this.roomsService.submitAnswer(slug, taskId, body.answer, body.userId);
  }

  @Post(':slug/hints/:hintId/unlock')
  @UseGuards(JwtAuthGuard)
  unlockHint(
    @Param('slug') slug: string,
    @Param('hintId') hintId: string,
    @Body() body: { userId: string },
  ) {
    return this.roomsService.unlockHint(slug, hintId, body.userId);
  }

  @Get(':slug/progress/:userId')
  @UseGuards(JwtAuthGuard)
  getProgress(@Param('slug') slug: string, @Param('userId') userId: string) {
    return this.roomsService.getProgress(slug, userId);
  }
}
