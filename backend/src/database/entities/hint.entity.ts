import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { RoomTask } from './room-task.entity';

@Entity('hints')
export class Hint {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => RoomTask, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'task_id' })
  task: RoomTask;

  @Column({ type: 'text' })
  hintText: string;

  @Column()
  hintOrder: number;

  @Column({ default: 5 })
  xpPenalty: number;

  @Column({ default: 0 })
  unlockAfterMinutes: number;
}
