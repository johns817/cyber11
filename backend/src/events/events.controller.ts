import { Controller, Get, Post, Param, Body, Query, UseGuards } from '@nestjs/common';
import { EventsService } from './events.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get()
  findAll(@Query('type') type?: string, @Query('status') status?: string) {
    return this.eventsService.findAll({ type, status });
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.eventsService.findById(id);
  }

  @Post(':id/register')
  @UseGuards(JwtAuthGuard)
  register(@Param('id') id: string, @Body() body: { userId: string; teamId?: string }) {
    return this.eventsService.register(id, body.userId, body.teamId);
  }

  @Get(':id/leaderboard')
  getLeaderboard(@Param('id') id: string) {
    return this.eventsService.getLeaderboard(id);
  }

  @Get('koth/active')
  getActiveKothGames() {
    return this.eventsService.getActiveKothGames();
  }

  @Post('koth/:gameId/join')
  @UseGuards(JwtAuthGuard)
  joinKoth(@Param('gameId') gameId: string, @Body() body: { userId: string }) {
    return this.eventsService.joinKoth(gameId, body.userId);
  }
}
