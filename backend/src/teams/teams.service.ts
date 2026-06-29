import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Team } from "../database/entities/team.entity";

@Injectable()
export class TeamsService {
  constructor(
    @InjectRepository(Team)
    private readonly teamRepository: Repository<Team>,
  ) {}

  async findAll(): Promise<Team[]> {
    return this.teamRepository.find({
      order: { points: "DESC" },
      relations: ["captain"],
    });
  }

  async findById(id: string): Promise<Team> {
    const team = await this.teamRepository.findOne({
      where: { id },
      relations: ["captain", "members"],
    });
    if (!team) throw new NotFoundException("Team not found");
    return team;
  }

  async create(data: Partial<Team>): Promise<Team> {
    const team = this.teamRepository.create(data);
    return this.teamRepository.save(team);
  }

  async getLeaderboard(limit = 50): Promise<Team[]> {
    return this.teamRepository.find({
      order: { points: "DESC" },
      take: limit,
      select: ["id", "name", "tag", "avatar", "points", "region"],
    });
  }
}
