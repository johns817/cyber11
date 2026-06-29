import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { User } from './user.entity';

@Entity('certificates')
export class Certificate {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ length: 20 })
  certificationCode: string;

  @Column({ length: 100 })
  certificationName: string;

  @CreateDateColumn()
  issueDate: Date;

  @Column({ type: 'timestamp', nullable: true })
  expiryDate: Date;

  @Column({ length: 500, nullable: true })
  verificationUrl: string;

  @Column({ nullable: true })
  score: number;

  @Column({ length: 500, nullable: true })
  pdfUrl: string;
}
