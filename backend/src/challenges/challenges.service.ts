import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Challenge, ChallengeCategory, ChallengeDifficulty } from "../database/entities/challenge.entity";

@Injectable()
export class ChallengesService {
  constructor(
    @InjectRepository(Challenge)
    private readonly challengeRepository: Repository<Challenge>,
  ) {}

  async findAll(filters?: {
    category?: ChallengeCategory;
    difficulty?: ChallengeDifficulty;
  }): Promise<Challenge[]> {
    const query = this.challengeRepository.createQueryBuilder("challenge");
    query.where("challenge.isActive = :isActive", { isActive: true });

    if (filters?.category) {
      query.andWhere("challenge.category = :category", { category: filters.category });
    }
    if (filters?.difficulty) {
      query.andWhere("challenge.difficulty = :difficulty", { difficulty: filters.difficulty });
    }

    return query.orderBy("challenge.points", "ASC").getMany();
  }

  async findById(id: string): Promise<Challenge> {
    const challenge = await this.challengeRepository.findOne({ where: { id } });
    if (!challenge) throw new NotFoundException("Challenge not found");
    return challenge;
  }

  async submitFlag(challengeId: string, flag: string): Promise<boolean> {
    const challenge = await this.findById(challengeId);
    const isCorrect = flag === challenge.flagHash;
    if (isCorrect) {
      challenge.solves += 1;
      await this.challengeRepository.save(challenge);
    }
    challenge.attempts += 1;
    await this.challengeRepository.save(challenge);
    return isCorrect;
  }
}
