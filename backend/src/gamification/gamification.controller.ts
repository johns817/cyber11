import { Controller, Get, Post, Param, UseGuards } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiBearerAuth } from "@nestjs/swagger";
import { GamificationService } from "./gamification.service";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";

@ApiTags("gamification")
@Controller("gamification")
export class GamificationController {
  constructor(private readonly gamificationService: GamificationService) {}

  @Get("achievements")
  @ApiOperation({ summary: "Get all achievements" })
  async getAllAchievements() {
    return this.gamificationService.getAllAchievements();
  }

  @Get("achievements/:userId")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Get achievements for a user" })
  async getUserAchievements(@Param("userId") userId: string) {
    return this.gamificationService.getUserAchievements(userId);
  }
}
