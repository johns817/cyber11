import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../database/entities/user.entity";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(data: Partial<User>): Promise<User> {
    const user = this.userRepository.create(data);
    return this.userRepository.save(user);
  }

  async findById(id: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { id } });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { username } });
  }

  async updateXp(userId: string, xpGained: number): Promise<User | null> {
    const user = await this.findById(userId);
    if (!user) return null;

    user.xp += xpGained;
    user.level = Math.floor(Math.sqrt(user.xp / 100)) + 1;
    return this.userRepository.save(user);
  }

  async getLeaderboard(limit = 100): Promise<User[]> {
    return this.userRepository.find({
      order: { xp: "DESC" },
      take: limit,
      select: ["id", "username", "displayName", "avatar", "level", "xp", "country", "streak"],
    });
  }

  async updateStreak(userId: string): Promise<void> {
    const user = await this.findById(userId);
    if (!user) return;

    const now = new Date();
    const lastActive = user.lastActiveDate;

    if (lastActive) {
      const diffDays = Math.floor(
        (now.getTime() - lastActive.getTime()) / (1000 * 60 * 60 * 24),
      );
      if (diffDays === 1) {
        user.streak += 1;
      } else if (diffDays > 1) {
        user.streak = 1;
      }
    } else {
      user.streak = 1;
    }

    user.lastActiveDate = now;
    await this.userRepository.save(user);
  }
}
