import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Achievement, UserAchievement } from "../database/entities/achievement.entity";
import { UsersService } from "../users/users.service";

@Injectable()
export class GamificationService {
  constructor(
    @InjectRepository(Achievement)
    private readonly achievementRepository: Repository<Achievement>,
    @InjectRepository(UserAchievement)
    private readonly userAchievementRepository: Repository<UserAchievement>,
    private readonly usersService: UsersService,
  ) {}

  async getAllAchievements(): Promise<Achievement[]> {
    return this.achievementRepository.find();
  }

  async getUserAchievements(userId: string): Promise<UserAchievement[]> {
    return this.userAchievementRepository.find({ where: { userId } });
  }

  async unlockAchievement(userId: string, achievementId: string): Promise<UserAchievement | null> {
    const existing = await this.userAchievementRepository.findOne({
      where: { userId, achievementId },
    });
    if (existing) return null;

    const achievement = await this.achievementRepository.findOne({
      where: { id: achievementId },
    });
    if (!achievement) return null;

    const userAchievement = this.userAchievementRepository.create({
      userId,
      achievementId,
    });

    await this.usersService.updateXp(userId, achievement.xpReward);
    return this.userAchievementRepository.save(userAchievement);
  }

  async awardXp(userId: string, amount: number): Promise<void> {
    await this.usersService.updateXp(userId, amount);
  }
}
