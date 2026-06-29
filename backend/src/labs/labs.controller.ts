import { Controller, Get, Post, Param, Body, Query, UseGuards } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiBearerAuth } from "@nestjs/swagger";
import { LabsService } from "./labs.service";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { LabDifficulty, LabOS } from "../database/entities/lab.entity";

@ApiTags("labs")
@Controller("labs")
export class LabsController {
  constructor(private readonly labsService: LabsService) {}

  @Get()
  @ApiOperation({ summary: "Get all labs with optional filters" })
  async findAll(
    @Query("difficulty") difficulty?: LabDifficulty,
    @Query("os") os?: LabOS,
  ) {
    return this.labsService.findAll({ difficulty, os });
  }

  @Get(":id")
  @ApiOperation({ summary: "Get lab by ID" })
  async findById(@Param("id") id: string) {
    return this.labsService.findById(id);
  }

  @Post(":id/flag")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Submit a flag for a lab" })
  async submitFlag(
    @Param("id") id: string,
    @Body("flag") flag: string,
  ) {
    const isCorrect = await this.labsService.submitFlag(id, flag, "user-id");
    return { correct: isCorrect };
  }
}
