import { Controller, Get, Post, Param, Body, Query, UseGuards } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiBearerAuth } from "@nestjs/swagger";
import { ChallengesService } from "./challenges.service";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { ChallengeCategory, ChallengeDifficulty } from "../database/entities/challenge.entity";

@ApiTags("challenges")
@Controller("challenges")
export class ChallengesController {
  constructor(private readonly challengesService: ChallengesService) {}

  @Get()
  @ApiOperation({ summary: "Get all challenges with optional filters" })
  async findAll(
    @Query("category") category?: ChallengeCategory,
    @Query("difficulty") difficulty?: ChallengeDifficulty,
  ) {
    return this.challengesService.findAll({ category, difficulty });
  }

  @Get(":id")
  @ApiOperation({ summary: "Get challenge by ID" })
  async findById(@Param("id") id: string) {
    return this.challengesService.findById(id);
  }

  @Post(":id/flag")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Submit a flag for a challenge" })
  async submitFlag(
    @Param("id") id: string,
    @Body("flag") flag: string,
  ) {
    const isCorrect = await this.challengesService.submitFlag(id, flag);
    return { correct: isCorrect };
  }
}
