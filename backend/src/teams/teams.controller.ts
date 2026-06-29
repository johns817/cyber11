import { Controller, Get, Post, Param, Body, UseGuards } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiBearerAuth } from "@nestjs/swagger";
import { TeamsService } from "./teams.service";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";

@ApiTags("teams")
@Controller("teams")
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @Get()
  @ApiOperation({ summary: "Get all teams" })
  async findAll() {
    return this.teamsService.findAll();
  }

  @Get("leaderboard")
  @ApiOperation({ summary: "Get team leaderboard" })
  async getLeaderboard() {
    return this.teamsService.getLeaderboard();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get team by ID" })
  async findById(@Param("id") id: string) {
    return this.teamsService.findById(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Create a new team" })
  async create(@Body() data: Partial<{ name: string; tag: string; description: string }>) {
    return this.teamsService.create(data);
  }
}
