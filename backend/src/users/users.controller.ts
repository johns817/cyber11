import { Controller, Get, Param, UseGuards, Query } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiBearerAuth } from "@nestjs/swagger";
import { UsersService } from "./users.service";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";

@ApiTags("users")
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get("leaderboard")
  @ApiOperation({ summary: "Get user leaderboard" })
  async getLeaderboard(@Query("limit") limit?: number) {
    return this.usersService.getLeaderboard(limit || 100);
  }

  @Get(":username")
  @ApiOperation({ summary: "Get user by username" })
  async getUserByUsername(@Param("username") username: string) {
    return this.usersService.findByUsername(username);
  }
}
