import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Lab, LabDifficulty, LabOS, LabStatus } from "../database/entities/lab.entity";

@Injectable()
export class LabsService {
  constructor(
    @InjectRepository(Lab)
    private readonly labRepository: Repository<Lab>,
  ) {}

  async findAll(filters?: {
    difficulty?: LabDifficulty;
    os?: LabOS;
    status?: LabStatus;
  }): Promise<Lab[]> {
    const query = this.labRepository.createQueryBuilder("lab");

    if (filters?.difficulty) {
      query.andWhere("lab.difficulty = :difficulty", { difficulty: filters.difficulty });
    }
    if (filters?.os) {
      query.andWhere("lab.os = :os", { os: filters.os });
    }
    if (filters?.status) {
      query.andWhere("lab.status = :status", { status: filters.status });
    } else {
      query.andWhere("lab.status = :status", { status: LabStatus.ACTIVE });
    }

    return query.orderBy("lab.createdAt", "DESC").getMany();
  }

  async findById(id: string): Promise<Lab> {
    const lab = await this.labRepository.findOne({ where: { id } });
    if (!lab) throw new NotFoundException("Lab not found");
    return lab;
  }

  async create(data: Partial<Lab>): Promise<Lab> {
    const lab = this.labRepository.create(data);
    return this.labRepository.save(lab);
  }

  async submitFlag(labId: string, flag: string, _userId: string): Promise<boolean> {
    const lab = await this.findById(labId);
    const isCorrect = flag === lab.userFlagHash || flag === lab.rootFlagHash;
    if (isCorrect) {
      lab.totalCompletions += 1;
      await this.labRepository.save(lab);
    }
    return isCorrect;
  }
}
